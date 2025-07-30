import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { FloatType } from "../../compiler/symbols/float-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralFloatAsn extends AbstractAstNode implements AstNode {
  constructor(
    rawValue: string,
    public readonly fieldId: string,
  ) {
    super();
    this.value = parseFloat(rawValue.trim());
  }

  compile(): string {
    this.compileErrors = [];
    return this.value.toString();
  }

  value: number;

  symbolType() {
    return FloatType.Instance;
  }

  toString() {
    return this.value.toString();
  }
}
