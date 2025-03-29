import { Regexes } from "../fields/regexes";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitInt } from "./lit-int";
import { OptionalNode } from "./optional-node";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";
import { Sequence } from "./sequence";

export class LitFloat extends AbstractSequence {
  constructor() {
    super();
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new LitInt());
      this.addElement(new PunctuationNode(DOT));
      this.addElement(new RegExMatchNode(Regexes.literalInt));
      const exponent = new OptionalNode(
        new Sequence([
          () => new RegExMatchNode(/e|E/),
          () => new RegExMatchNode(Regexes.negatableLitInt),
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
