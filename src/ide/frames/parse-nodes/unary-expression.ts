import { notKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { KeywordNode } from "./keyword-node";
import { PunctuationNode } from "./punctuation-node";
import { Term } from "./term";
import { Space } from "./parse-node-helpers";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { MINUS } from "../symbols";

export class UnaryExpression extends AbstractSequence {
  unaryOp: Alternatives | undefined;
  term: Term | undefined;

  constructor() {
    super();
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const minus = () => new PunctuationNode(MINUS);
      const not = () => new KeywordNode(notKeyword);
      const sp = () => new SpaceNode(Space.added);
      const notSp = () => new Sequence([not, sp]);
      this.unaryOp = new Alternatives([minus, notSp]);
      this.addElement(this.unaryOp);
      this.term = new Term();
      this.addElement(this.term);
      return super.parseText(text);
    }
  }
}
