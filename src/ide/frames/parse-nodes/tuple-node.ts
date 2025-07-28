import { tupleKeyword } from "../../../compiler/keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class TupleNode extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(tupleKeyword));
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.csv = new CSV(() => new ExprNode(), 2);
      this.addElement(this.csv);
      this.addElement(new SpaceNode(Space.ignored));
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
