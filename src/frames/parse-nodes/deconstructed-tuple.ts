import { TokenType } from "../symbol-completion-helpers";
import { propertyKeyword } from "../keywords";
import { UNDERSCORE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";
import { assignableIds } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";

export class DeconstructedTuple extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const id = () => new IdentifierNode();
      const discard = () => new PunctuationNode(UNDERSCORE);
      const element = () => new Alternatives([id, discard]);
      this.csv = new CSV(element, 2);
      this.addElement(this.csv);
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
