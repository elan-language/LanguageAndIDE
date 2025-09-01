import { SINGLE_QUOTE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitStringNonInterpContents } from "./lit-string-non-interp-contents";
import { PunctuationNode } from "./punctuation-node";

export class LitStringNonInterp extends AbstractSequence {
  contents: LitStringNonInterpContents | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.contents = new LitStringNonInterpContents();
      this.addElement(new PunctuationNode(SINGLE_QUOTE));
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(SINGLE_QUOTE));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `'<el-lit>${this.contents!.renderAsHtml()}</el-lit>'`;
  }
}
