import { File } from "../frame-interfaces/file";
import { MINUS } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { Term } from "./term";

export class UnaryExpression2 extends AbstractSequence {
  unaryOp: Alternatives | undefined;
  term: Term | undefined;

  elanNot = "not";

  constructor(file: File) {
    super(file);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const lang = this.file.language();
      const minus = () => new PunctuationNode(this.file, MINUS);
      const not = () => new KeywordNode(this.file, lang.NOT);
      const sp = () => new SpaceNode(this.file, Space.added);
      const notSp = () => new Sequence(this.file, [not, sp]);
      this.unaryOp = new Alternatives(this.file, [minus, notSp]);
      this.addElement(this.unaryOp);
      this.term = new Term(this.file);
      this.addElement(this.term);
      return super.parseText(text);
    }
  }

  renderAsElanSource(): string {
    return ``;
  }

  renderAsHtml(): string {
    return ``;
  }
}
