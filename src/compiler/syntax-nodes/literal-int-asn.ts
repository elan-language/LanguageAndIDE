import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { IntType } from "../../compiler/symbols/int-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralIntAsn extends AbstractAstNode implements AstNode {
  constructor(
    rawValue: string,
    isBinary: boolean,
    isHex: boolean,
    public readonly fieldId: string,
  ) {
    super();
    const trimmed = rawValue.trim();
    if (isBinary) {
      this.value = parseInt(trimmed, 2);
    } else if (isHex) {
      this.value = parseInt(trimmed, 16);
    } else {
      this.value = parseInt(trimmed);
    }
  }

  compile(): string {
    this.compileErrors = [];
    return this.value.toString();
  }

  value: number;

  symbolType() {
    return IntType.Instance;
  }

  toString() {
    return this.value.toString();
  }
}
