import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { RegExpType } from "../../compiler/symbols/regexp-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralRegExAsn extends AbstractAstNode implements AstNode {
  constructor(
    rawValue: string,
    public readonly fieldId: string,
  ) {
    super();
    const trimmed = rawValue.trim();
    const r = trimmed.substring(1, trimmed.length - 1); //Remove delimiting slashes as RegExp will add them back automatically
    this.value = new RegExp(r);
  }

  value: RegExp;

  compile(): string {
    return `${this.value}`;
  }

  symbolType() {
    return RegExpType.Instance;
  }

  toString() {
    return `${this.value}`;
  }
}
