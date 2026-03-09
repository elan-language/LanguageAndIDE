import { File } from "../frame-interfaces/file";
import { MINUS } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { NotOperator } from "./notOperator";
import { PunctuationNode } from "./punctuation-node";
import { Term } from "./term";

export class UnaryExpression extends AbstractSequence {
  unaryOp: Alternatives | undefined;
  term: Term | undefined;

  constructor(file: File) {
    super(file);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const minus = () => new PunctuationNode(this.file, MINUS);
      const not = () => new NotOperator(this.file, (lang) => lang.NOT);
      this.unaryOp = new Alternatives(this.file, [minus, not]);
      this.addElement(this.unaryOp);
      this.term = new Term(this.file);
      this.addElement(this.term);
      return super.parseText(text);
    }
  }
}
