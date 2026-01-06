import { Regexes } from "../fields/regexes";
import { DIVIDE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { OptionalNode } from "./optional-node";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";
import { File } from "../frame-interfaces/file";

export class LitRegExp extends AbstractSequence {
  open: PunctuationNode | undefined;
  content: RegExMatchNode | undefined;
  flags: OptionalNode | undefined;
  close: PunctuationNode | undefined;

  constructor(file: File) {
    super(file);
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.open = new PunctuationNode(this.file, DIVIDE);
      this.content = new RegExMatchNode(this.file, Regexes.anythingExceptUnescapedForwardSlash);
      this.close = new PunctuationNode(this.file, DIVIDE);
      this.flags = new OptionalNode(this.file, new RegExMatchNode(this.file, Regexes.flags));
      this.addElement(this.open);
      this.addElement(this.content);
      this.addElement(this.close);
      this.addElement(this.flags);
      super.parseText(text);
    }
  }

  renderAsElanSource(): string {
    return `${this.open?.matchedText}${this.content?.matchedText}${this.close?.matchedText}${this.flags?.matchedText}`;
  }

  renderAsHtml(): string {
    let flags = ``;
    if (this.flags) {
      flags =
        this.flags!.matchedText.length > 0
          ? `<el-regex>${this.flags?.renderAsHtml()}</el-regex>`
          : ``;
    }
    return `/<el-regex>${this.content?.renderAsHtml()}</el-regex>/${flags}`;
  }
}
