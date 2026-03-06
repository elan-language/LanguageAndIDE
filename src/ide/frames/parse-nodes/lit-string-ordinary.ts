import { File } from "../frame-interfaces/file";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringOrdinary extends AbstractSequence {
  constructor(file: File) {
    super(file);
    this.contents = new RegExMatchNode(this.file, /^[^"]*/);
    this.completionWhenEmpty = this.getCompletionFromLangOr(`"string"`);
  }

  private contents: RegExMatchNode;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(this.file, DOUBLE_QUOTES));
      super.parseText(text);
    }
  }
  override renderAsHtml(): string {
    const text = this.contents.matchedText;
    const contents = text.length > 0 ? `<el-lit>${text}</el-lit>` : ``;
    return `"${contents}"`;
  }
}
