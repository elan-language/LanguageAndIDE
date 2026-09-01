import { AstNode } from "../compiler-interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class StringTypeAsn extends AbstractAstNode implements AstNode {
  constructor(public readonly fieldId: string) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return this.symbolType().initialValue;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return `${this.symbolType()}`;
  }
}
