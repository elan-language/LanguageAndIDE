import { TokenType } from "../symbol-completion-helpers";
import { propertyKeyword } from "../keywords";
import { COLON, UNDERSCORE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { assignableIds } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";

export class DeconstructedList extends AbstractSequence {
  head: Alternatives | undefined;
  tail: Alternatives | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const head = () => new IdentifierNode();
      const discard = () => new PunctuationNode(UNDERSCORE);
      this.head = new Alternatives([head, discard]);
      this.addElement(this.head);
      this.addElement(new PunctuationNode(COLON));
      const tail = () => new IdentifierNode();
      this.tail = new Alternatives([tail, discard]);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    if (this.getElements().length === 0) {
      return new Set<TokenType>(assignableIds);
    } else {
      return super.symbolCompletion_tokenTypes();
    }
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([propertyKeyword])
      : super.symbolCompletion_keywords();
  }
}
