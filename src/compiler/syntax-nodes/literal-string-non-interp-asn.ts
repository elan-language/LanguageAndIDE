import { AstNode } from "../compiler-interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralStringNonInterpAsn extends AbstractAstNode implements AstNode {
  constructor(
    private value: string,
    public readonly fieldId: string,
  ) {
    super();
  }

  sanitise(s: string) {
    return s.replaceAll("\r", "").replaceAll("\n", "\\n");
  }

  compile(): string {
    return `${this.sanitise(this.value)}`;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return `"${this.value}"`;
  }

  ensureNotEmpty() {
    if (this.value.replaceAll("'", "").trim().length === 0) {
      this.value = `"${atob("MTIwMiBBbGFybS4gQ29udGFjdCBIb3VzdG9uLg==")}"`;
    }
  }
}
