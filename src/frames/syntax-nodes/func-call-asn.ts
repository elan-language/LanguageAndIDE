import { CompileError } from "../compile-error";
import {
  mustBeKnownSymbol,
  mustBePureFunctionSymbol,
  mustCallExtensionViaQualifier,
  mustMatchParameters,
} from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { FunctionType } from "../symbols/function-type";
import { funcScopePrefix, scopePrefix } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { containsGenericType, generateType, matchGenericTypes2, transforms } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    private readonly qualifier: AstNode | undefined,
    private readonly parameters: Array<AstNode>,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
    this.id = id.trim();
  }

  private precedingNode?: AstNode = undefined;
  private updatedScope?: Scope = undefined;

  updateScopeAndChain(s: Scope, ast: AstNode) {
    this.updatedScope = s;
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return !this.isExtensionMethod;
  }

  private isExtensionMethod: boolean = false;

  get mId() {
    return this.id;
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];

    for (const i of this.parameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }

    if (this.qualifier) {
      cc.concat(this.qualifier.aggregateCompileErrors());
    }

    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const currentScope = this.updatedScope ?? this.scope.getParentScope();
    // const [updatedQualifier, currentScope] = updateScopeAndQualifier(
    //   this,
    //   transforms(),
    //   this.scope,
    // );

    const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    const fst = funcSymbol.symbolType(transforms());
    //let qualifier = updatedQualifier;
    let isAsync: boolean = false;

    mustBeKnownSymbol(funcSymbol, this.compileErrors, this.fieldId);
    mustBePureFunctionSymbol(fst, this.scope, this.compileErrors, this.fieldId);

    if (fst instanceof FunctionType) {
      mustCallExtensionViaQualifier(fst, this.precedingNode, this.compileErrors, this.fieldId);

      if (fst.isExtension && this.precedingNode) {
        this.isExtensionMethod = true;
        parameters = [this.precedingNode].concat(parameters);
        //qualifier = undefined;
      }

      let parameterTypes = fst.parametersTypes;

      if (parameterTypes.some((pt) => containsGenericType(pt))) {
        // this.parameters is correct - function adds qualifier if extension
        const matches = matchGenericTypes2(fst, this.parameters, this.precedingNode);
        parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
      }

      mustMatchParameters(
        parameters,
        parameterTypes,
        fst.isExtension,
        this.compileErrors,
        this.fieldId,
      );

      isAsync = fst.isAsync;
    }

    const a = isAsync ? "await " : "";
    const pp = parameters.map((p) => p.compile()).join(", ");
    const q =
      this.precedingNode && this.showPreviousNode ? "" : scopePrefix(funcSymbol?.symbolScope);
    //return q ? `${a}${q}${this.id}(${pp})` : `${this.mId}(${pp})`;

    return `${a}${q}${this.mId}(${pp})`;
  }

  symbolType() {
    // const [updatedQualifier, currentScope] = updateScopeAndQualifier(
    //   this,
    //   transforms(),
    //   this.scope,
    // );

    const currentScope = this.updatedScope ?? this.scope.getParentScope();
    const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    const fst = funcSymbol.symbolType(transforms());

    if (fst instanceof FunctionType) {
      const returnType = fst.returnType;

      if (containsGenericType(returnType)) {
        const matches = matchGenericTypes2(fst, this.parameters, this.precedingNode);
        return generateType(returnType, matches);
      }
      return returnType;
    }

    return fst;
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    const q = this.qualifier ? `${this.qualifier}` : "";
    return `Func Call ${q}${this.id} (${pp})`;
  }
}
