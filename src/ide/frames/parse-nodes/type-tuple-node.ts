import { TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { PunctuationNode } from "./punctuation-node";
import { TypeNode } from "./type-node";

export class TypeTupleNode extends AbstractSequence {
  types: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.types = new CSV(
        this.file,
        () =>
          new TypeNode(
            this.file,
            new Set<TokenType>([
              TokenType.type_concrete,
              TokenType.type_abstract,
              TokenType.type_notInheritable,
            ]),
          ),
        2,
      );
      this.addElement(new PunctuationNode(this.file, OPEN_BRACKET));
      this.addElement(this.types);
      this.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
