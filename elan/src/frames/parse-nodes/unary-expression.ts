import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { Term } from "./term";
import { SymbolNode } from "./symbol-node";
import { KeywordNode } from "./keyword-node";
import { notKeyword } from "../keywords";

import { MINUS } from "../symbols";
import { SpaceNode } from "./space-node";
import { Space } from "./parse-node-helpers";
import { Sequence } from "./sequence";

export class UnaryExpression extends AbstractSequence {
  unaryOp: Alternatives | undefined;
  term: Term | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "op";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const minus = () => new SymbolNode(MINUS);
      const not = () => new KeywordNode(notKeyword);
      const sp = () => new SpaceNode(Space.required);
      const notSp = () => new Sequence([not, sp]);
      this.unaryOp = new Alternatives([minus, notSp]);
      this.addElement(this.unaryOp);
      this.term = new Term();
      this.addElement(this.term);
      return super.parseText(text);
    }
  }
}
