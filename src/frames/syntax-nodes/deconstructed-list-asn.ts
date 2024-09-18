import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";

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
    return `[${this.head}, ...${this.tail}]`;
  }

  symbolType() {
    return { name: "", isImmutable: true, initialValue: "" };
  }

  toString() {
    return `${this.head}:${this.tail}`;
  }
}
