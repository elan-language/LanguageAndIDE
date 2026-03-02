import { AstNode } from "../compiler-interfaces/ast-node";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralBooleanAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly value: boolean,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    return this.value.toString();
  }

  symbolType() {
    return BooleanType.Instance;
  }

  toString() {
    return this.value.toString();
  }
}
