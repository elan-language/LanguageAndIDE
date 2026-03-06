import { MINUS } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitInt } from "./lit-int";
import { OptionalNode } from "./optional-node";
import { PunctuationNode } from "./punctuation-node";

export class StepNode extends AbstractSequence {
  minus: OptionalNode | undefined;
  value: LitInt | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.minus = new OptionalNode(this.file, new PunctuationNode(this.file, MINUS));
      this.addElement(this.minus);
      this.value = new LitInt(this.file);
      this.addElement(this.value);
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
