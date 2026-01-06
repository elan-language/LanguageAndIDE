import { Regexes } from "../fields/regexes";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitInt } from "./lit-int";
import { OptionalNode } from "./optional-node";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";
import { Sequence } from "./sequence";
import { File } from "../frame-interfaces/file";

export class LitFloat extends AbstractSequence {
  constructor(file: File) {
    super(file);
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new LitInt(this.file));
      this.addElement(new PunctuationNode(this.file, DOT));
      this.addElement(new RegExMatchNode(this.file, Regexes.literalInt));
      const exponent = new OptionalNode(
        this.file,
        new Sequence(this.file, [
          () => new RegExMatchNode(this.file, /e|E/),
          () => new RegExMatchNode(this.file, Regexes.negatableLitInt),
        ]),
      );
      this.addElement(exponent);
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<el-lit>${super.renderAsHtml()}</el-lit>`;
  }
  compile(): string {
    return this.matchedText.toUpperCase();
  } //For the exponent e -> E
}
