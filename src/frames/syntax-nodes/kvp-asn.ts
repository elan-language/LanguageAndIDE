import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";

export class KvpAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly key: AstNode,
    public readonly value: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.key.aggregateCompileErrors())
      .concat(this.value.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    return `[${this.key.compile()}] : ${this.value.compile()}`;
  }

  keySymbolType() {
    return this.key.symbolType();
  }

  symbolType() {
    return this.value.symbolType();
  }

  toString() {
    return `${this.key}:${this.value}`;
  }
}
