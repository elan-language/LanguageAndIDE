import { CompileError } from "../compile-error";
import { mustBeKnownSymbolType, mustNotBeKeyword } from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { Scope } from "../interfaces/scope";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";

export class ParamDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly type: AstIdNode,
    private readonly out: boolean,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.type.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];

    // compile type to catch any errors
    this.type.compile();

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);

    mustBeKnownSymbolType(this.symbolType(), this.type.id, this.compileErrors, this.fieldId);

    return `${this.id}`;
  }

  symbolType() {
    return this.type.symbolType();
  }

  toString() {
    return `${this.out ? "out " : ""}${this.id} as ${this.type}`;
  }

  get symbolScope() {
    return this.out ? SymbolScope.outParameter : SymbolScope.parameter;
  }
}
