import { FunctionType } from "../symbols/function-type";
import { CompileError } from "../compile-error";
import {
  mustBeKnownSymbol,
  mustBePureFunctionSymbol,
  mustCallExtensionViaQualifier,
  mustMatchParameters,
} from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { QualifierAsn } from "./qualifier-asn";
import { containsGenericType, generateType, matchGenericTypes, transforms } from "./ast-helpers";
import { getParentScope, scopePrefix, updateScopeAndQualifier } from "../symbols/symbol-helpers";

export class FuncCallAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly qualifier: AstNode | undefined,
    private readonly parameters: Array<AstNode>,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
    this.id = id.trim();
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
    const [updatedQualifier, currentScope] = updateScopeAndQualifier(
      this.qualifier as QualifierAsn | undefined,
      transforms(),
      this.scope,
    );

    const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    const fst = funcSymbol.symbolType(transforms());
    let qualifier = updatedQualifier;

    mustBeKnownSymbol(funcSymbol, this.compileErrors, this.fieldId);
    mustBePureFunctionSymbol(fst, this.scope, this.compileErrors, this.fieldId);

    if (fst instanceof FunctionType) {
      mustCallExtensionViaQualifier(fst, qualifier, this.compileErrors, this.fieldId);

      if (fst.isExtension && qualifier instanceof QualifierAsn) {
        parameters = [qualifier.value as AstNode].concat(parameters);
        qualifier = undefined;
      }

      let parameterTypes = fst.parametersTypes;

      if (parameterTypes.some((pt) => containsGenericType(pt))) {
        const matches = matchGenericTypes(fst, this.parameters, this.qualifier);
        parameterTypes = parameterTypes.map((pt) => generateType(pt, matches));
      }

      mustMatchParameters(
        parameters,
        parameterTypes,
        fst.isExtension,
        this.compileErrors,
        this.fieldId,
      );
    }

    const pp = parameters.map((p) => p.compile()).join(", ");
    const q = qualifier ? `${qualifier.compile()}` : scopePrefix(funcSymbol?.symbolScope);
    return `${q}${this.id}(${pp})`;
  }

  symbolType() {
    const [updatedQualifier, currentScope] = updateScopeAndQualifier(
      this.qualifier as QualifierAsn | undefined,
      transforms(),
      this.scope,
    );

    const funcSymbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    const fst = funcSymbol.symbolType(transforms());

    if (fst instanceof FunctionType) {
      const returnType = fst.returnType;

      if (containsGenericType(returnType)) {
        const matches = matchGenericTypes(fst, this.parameters, this.qualifier);
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
