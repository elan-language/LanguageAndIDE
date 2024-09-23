import { CompileError } from "../compile-error";
import { AstIdNode } from "../interfaces/ast-id-node";
import { Scope } from "../interfaces/scope";
import { DeconstructedListType } from "../symbols/deconstructed-list-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

export class DeconstructedListAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    private readonly head: string,
    private readonly tail: string,
    public readonly fieldId: string,
    private readonly scope: Scope,
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
    const hdSt = this.scope
      .getParentScope()
      .resolveSymbol(this.head, transforms(), this.scope)
      .symbolType();

    const tlSt = this.scope
      .getParentScope()
      .resolveSymbol(this.tail, transforms(), this.scope)
      .symbolType();

    return new DeconstructedListType(this.head, this.tail, hdSt, tlSt);
  }

  toString() {
    return `${this.head}:${this.tail}`;
  }
}
