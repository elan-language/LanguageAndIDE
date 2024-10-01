import { CompileError } from "../compile-error";
import {
  mustBeKnownSymbol,
  mustBePublicMember,
  mustBePureFunctionSymbol,
  mustCallExtensionViaQualifier,
  mustMatchParameters,
} from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { FunctionType } from "../symbols/function-type";
import { isMemberOnFieldsClass, scopePrefix } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { containsGenericType, matchGenericTypes, generateType, transforms } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    private readonly parameters: Array<AstNode>,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  private precedingNode?: AstNode = undefined;
  private updatedScope?: Scope = undefined;

  updateScopeAndChain(scope: Scope, ast: AstNode) {
    this.updatedScope = scope;
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return !this.isExtensionMethod;
  }

  private isExtensionMethod: boolean = false;

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];

    for (const i of this.parameters) {
      cc = cc.concat(i.aggregateCompileErrors());
    }

    return this.compileErrors.concat(cc);
  }

  getSymbolAndType(): [ElanSymbol, SymbolType] {
    const currentScope = this.updatedScope ?? this.scope.getParentScope();
    const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    const funcSymbolType = funcSymbol.symbolType(transforms());
    return [funcSymbol, funcSymbolType];
  }

  compile(): string {
    this.compileErrors = [];

    let parameters = [...this.parameters];
    const [funcSymbol, funcSymbolType] = this.getSymbolAndType();

    let isAsync: boolean = false;

    mustBeKnownSymbol(funcSymbol, this.compileErrors, this.fieldId);
    mustBePureFunctionSymbol(funcSymbolType, this.scope, this.compileErrors, this.fieldId);

    if (!isMemberOnFieldsClass(funcSymbol, transforms(), this.scope)) {
      mustBePublicMember(funcSymbol, this.compileErrors, this.fieldId);
    }

    if (funcSymbolType instanceof FunctionType) {
      mustCallExtensionViaQualifier(
        funcSymbolType,
        this.precedingNode,
        this.compileErrors,
        this.fieldId,
      );

      if (funcSymbolType.isExtension && this.precedingNode) {
        this.isExtensionMethod = true;
        parameters = [this.precedingNode].concat(parameters);
      }

      let parameterTypes = funcSymbolType.parametersTypes;

      if (parameterTypes.some((pt) => containsGenericType(pt))) {
        // this.parameters is correct - function adds qualifier if extension
        const matches = matchGenericTypes(funcSymbolType, this.parameters, this.precedingNode);
        parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
      }

      mustMatchParameters(
        parameters,
        parameterTypes,
        funcSymbolType.isExtension,
        this.compileErrors,
        this.fieldId,
      );

      isAsync = funcSymbolType.isAsync;
    }

    const a = isAsync ? "await " : "";
    const pp = parameters.map((p) => p.compile()).join(", ");
    const prefix =
      this.precedingNode && this.showPreviousNode
        ? ""
        : scopePrefix(funcSymbol, this.compileErrors, this.scope, this.fieldId);

    return `${a}${prefix}${this.id}(${pp})`;
  }

  symbolType() {
    const [, funcSymbolType] = this.getSymbolAndType();

    if (funcSymbolType instanceof FunctionType) {
      const returnType = funcSymbolType.returnType;

      if (containsGenericType(returnType)) {
        const matches = matchGenericTypes(funcSymbolType, this.parameters, this.precedingNode);
        return generateType(returnType, matches);
      }
      return returnType;
    }

    return funcSymbolType;
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");
    return `${this.id}(${pp})`;
  }
}
