import { File } from "../frame-interfaces/file";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitStringText } from "./lit-string-text";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";

export class LitStringOrdinary extends AbstractSequence {
  segments: Multiple | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      this.addElement(new LitStringText(this.file));
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `"<el-lit>${this.segments!.renderAsHtml()}</el-lit>"`;
  }
}
