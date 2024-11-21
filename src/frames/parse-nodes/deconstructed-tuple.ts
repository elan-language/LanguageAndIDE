import { UNDERSCORE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";
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
}
