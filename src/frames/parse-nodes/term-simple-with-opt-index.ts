import { Index } from ".";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { OptionalNode } from "./optional-node";
import { TermSimple } from "./term-simple";

export class TermSimpleWithOptIndex extends AbstractSequence {
  termSimple: TermSimple | undefined;
  optIndex: OptionalNode | undefined;
  defaultTokenTypes = new Set([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
    TokenType.id_enumValue,
    TokenType.method_function,
    TokenType.method_system,
  ]);

  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.termSimple = new TermSimple();
      this.addElement(this.termSimple);
      this.optIndex = new OptionalNode(new Index());
      this.addElement(this.optIndex);
      super.parseText(text);
    }
  }
}
