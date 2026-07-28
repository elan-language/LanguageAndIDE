import { AstNode } from "../compiler-interfaces/ast-node";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class BooleanTypeAsn extends AbstractAstNode implements AstNode {
  constructor(public readonly fieldId: string) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return this.symbolType().initialValue;
  }

  symbolType() {
    return BooleanType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}
