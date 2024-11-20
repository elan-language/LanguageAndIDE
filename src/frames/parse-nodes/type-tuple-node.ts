import { TokenType } from "../helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { PunctuationNode } from "./punctuation-node";
import { TypeNode } from "./type-node";

export class TypeTupleNode extends AbstractSequence {
  types: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.types = new CSV(() => new TypeNode([TokenType.type_concrete, TokenType.type_abstract]), 2);
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.addElement(this.types);
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}