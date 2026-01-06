import { SINGLE_QUOTE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitStringSingleQuotesContents } from "./lit-string-single-quotes-contents";
import { PunctuationNode } from "./punctuation-node";

export class LitStringSingleQuotes extends AbstractSequence {
  contents: LitStringSingleQuotesContents | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.contents = new LitStringSingleQuotesContents(this.file);
      this.addElement(new PunctuationNode(this.file, SINGLE_QUOTE));
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(this.file, SINGLE_QUOTE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `'<el-lit>${this.contents!.renderAsHtml()}</el-lit>'`;
  }
}
