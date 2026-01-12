import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { LitStringInterpolation } from "./lit-string-interpolation";
import { LitStringDoubleQuotesContents } from "./lit-string-double-quotes-contents";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";
import { File } from "../frame-interfaces/file";

export class LitStringDoubleQuotesNonEmpty extends AbstractSequence {
  segments: Multiple | undefined;

  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = `"string"`;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const field = () => new LitStringInterpolation(this.file);
      const plainText = () => new LitStringDoubleQuotesContents(this.file);
      const segment = () => new Alternatives(this.file, [field, plainText]);
      this.segments = new Multiple(this.file, segment, 1);
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      this.addElement(this.segments);
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    return `"<el-lit>${this.segments!.renderAsHtml()}</el-lit>"`;
  }
}
