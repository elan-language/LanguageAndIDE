import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { DeconstructedListType } from "../../compiler/symbols/deconstructed-list-type";
import { getGlobalScope, isGenericSymbolType } from "../../compiler/symbols/symbol-helpers";
import { mustBeAssignableType } from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";

export class DeconstructedListAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    private readonly head: AstNode,
    private readonly tail: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  get id() {
    return `${this.head.compile()},${this.tail.compile()}`;
  }

  compile(): string {
    this.compileErrors = [];
    const st = this.symbolType();

    if (isGenericSymbolType(st.tailType)) {
      mustBeAssignableType(st.headType, st.tailType.ofTypes[0], this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

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
