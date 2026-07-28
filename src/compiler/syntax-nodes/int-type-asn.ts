import { AstNode } from "../compiler-interfaces/ast-node";
import { IntType } from "../symbols/int-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class IntTypeAsn extends AbstractAstNode implements AstNode {
  constructor(public readonly fieldId: string) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return this.symbolType().initialValue;
  }

  symbolType() {
    return IntType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}
