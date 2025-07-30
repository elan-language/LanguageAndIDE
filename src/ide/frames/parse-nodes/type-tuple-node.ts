import { TokenType } from "../symbol-completion-helpers";
import { OPEN_BRACKET, CLOSE_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { PunctuationNode } from "./punctuation-node";
import { TypeNode } from "./type-node";

export class TypeTupleNode extends AbstractSequence {
  types: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.types = new CSV(
        () =>
          new TypeNode(
            new Set<TokenType>([
              TokenType.type_concrete,
              TokenType.type_abstract,
              TokenType.type_notInheritable,
            ]),
          ),
        2,
      );
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.addElement(this.types);
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
