import { Regexes } from "../fields/regexes";
import { DIVIDE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";

export class LitRegEx extends AbstractSequence {
  open: PunctuationNode | undefined;
  content: RegExMatchNode | undefined;
  close: PunctuationNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = `"regular expression"`;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.open = new PunctuationNode(DIVIDE);
      this.content = new RegExMatchNode(Regexes.anythingExceptUnescapedForwardSlash);
      this.close = new PunctuationNode(DIVIDE);
      this.addElement(this.open);
      this.addElement(this.content);
      this.addElement(this.close);
      super.parseText(text);
    }
  }

  renderAsSource(): string {
    return `${this.open?.matchedText}${this.content?.matchedText}${this.close?.matchedText}`;
  }

  renderAsHtml(): string {
    return `<el-regex>${this.renderAsSource()}</el-regex>`;
  }
}
