import { CompileError } from "../compile-error";
import { mustBeAssignableType } from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { DeconstructedListType } from "../symbols/deconstructed-list-type";
import { isGenericSymbolType } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class DeconstructedListAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    private readonly head: AstNode,
    private readonly tail: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  get id() {
    return `${this.head.compile()},${this.tail.compile()}`;
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.head.compileErrors).concat(this.tail.compileErrors);
  }

  compile(): string {
    this.compileErrors = [];
    const st = this.symbolType();

    if (isGenericSymbolType(st.tailType)) {
      mustBeAssignableType(st.headType, st.tailType.ofType, this.compileErrors, this.fieldId);
    }

    return `${this.head.compile()}, ${this.tail.compile()}`;
  }

  symbolType() {
    const headSt = this.head.symbolType();
    const tailSt = this.tail.symbolType();

    return new DeconstructedListType(this.head.compile(), this.tail.compile(), headSt, tailSt);
  }

  toString() {
    return `${this.head}:${this.tail}`;
  }
}
