import { File } from "../frame-interfaces/file";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { LitStringText } from "./lit-string-text";
import { PunctuationNode } from "./punctuation-node";

export class LitStringOrdinary extends AbstractSequence {
  constructor(file: File) {
    super(file);
    this.contents = new LitStringText(this.file, /^[^"]*/);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  private contents: LitStringText;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
}
