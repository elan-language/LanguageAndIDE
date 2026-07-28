import { AstNode } from "../compiler-interfaces/ast-node";
import { FloatType } from "../symbols/float-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class FloatTypeAsn extends AbstractAstNode implements AstNode {
  constructor(public readonly fieldId: string) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return this.symbolType().initialValue;
  }

  symbolType() {
    return FloatType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}
