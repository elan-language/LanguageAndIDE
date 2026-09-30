import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class TermAsn extends AbstractAstNode {
  constructor(
    public readonly lhs: AstNode,
    public readonly rhs: AstNode | undefined,
    public readonly index: AstNode | undefined,
    public readonly fieldId: string,
    public readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    let code = this.rhs ? `${this.lhs.compile()}.${this.rhs.compile()}` : this.lhs.compile();

    if (this.index) {
      code = `system.safeIndex(${code}, ${this.index.compile()})`;
    }

    return code;
  }

  symbolType() {
    return this.rhs ? this.rhs?.symbolType() : this.lhs.symbolType();
  }

  toString() {
    return this.rhs ? `${this.lhs}.${this.rhs}` : this.lhs;
  }
}
