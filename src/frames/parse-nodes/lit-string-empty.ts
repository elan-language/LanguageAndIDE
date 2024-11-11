import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";

export class LitStringEmpty extends AbstractSequence {
  constructor() {
    super();
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(DOUBLE_QUOTES));
      this.addElement(new PunctuationNode(DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `<el-str>${this.renderAsSource()}</el-str>`;
  }
}
