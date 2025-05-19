import { CompileError } from "../compile-error";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

export class ConstantFrameAsn extends AbstractAstNode implements AstNode {
  constructor(
    private name: AstNode,
    private value: AstNode,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  symbolType(): SymbolType {
    return this.value.symbolType();
  }

  compile(): string {
    this.compileErrors = [];
    const name = this.name.compile();
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this.scope),
      transforms(),
      this.compileErrors,
      this.fieldId,
    );

    return `${name} = ${this.value.compile()};\r
    `;
  }

  aggregateCompileErrors(): CompileError[] {
    throw new Error("Method not implemented.");
  }
}
