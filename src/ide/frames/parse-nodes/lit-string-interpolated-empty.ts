import { File } from "../frame-interfaces/file";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";

export class LitStringInterpolatedEmpty extends AbstractSequence {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const prefix = this.file.language().INTERPOLATED_STRING_PREFIX;
      this.addElement(new PunctuationNode(this.file, prefix));
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  renderAsHtml(): string {
    const langPrefix = this.file.language().INTERPOLATED_STRING_PREFIX;
    return `${langPrefix}""`;
  }
}
