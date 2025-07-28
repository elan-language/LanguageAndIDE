import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { AbstractAstNode } from "./abstract-ast-node";

export class BracketedAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly body: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    return `(${this.body.compile()})`;
  }

  symbolType() {
    return this.body.symbolType();
  }

  toString() {
    return `(${this.body})`;
  }
}
