import { AstNode } from "../compiler-interfaces/ast-node";
import { AbstractAstNode } from "./abstract-ast-node";

export class KvpAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly key: AstNode,
    public readonly value: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    return `[${this.key.compile()}, ${this.value.compile()}]`;
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
