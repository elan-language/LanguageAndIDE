import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";

export class DeconstructedListAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly head: string,
    private readonly tail: string,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];
    throw new Error("Method not implemented.");
  }

  symbolType() {
    return { name: "", isImmutable: true };
  }

  toString() {
    return `[${this.head}:${this.tail}]`;
  }
}
