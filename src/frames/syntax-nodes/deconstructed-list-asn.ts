import { CompileError } from "../compile-error";
import { AstIdNode } from "../interfaces/ast-id-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";

export class DeconstructedListAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    private readonly head: string,
    private readonly tail: string,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  get id() {
    return `${this.head},${this.tail}`;
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];
    return `[${this.head}, ${this.tail}]`;
  }

  symbolType() {
    return { name: "", isImmutable: true, initialValue: "" };
  }

  toString() {
    return `${this.head}:${this.tail}`;
  }
}
