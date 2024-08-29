import { Regexes } from "../fields/regexes";
import { DIVIDE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { RegExMatchNode } from "./regex-match-node";
import { SymbolNode } from "./symbol-node";

export class LitRegEx extends AbstractSequence {
  open: SymbolNode | undefined;
  content: RegExMatchNode | undefined;
  close: SymbolNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = `"regular expression"`;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.open = new SymbolNode(DIVIDE);
      this.content = new RegExMatchNode(Regexes.anythingExceptUnescapedForwardSlash);
      this.close = new SymbolNode(DIVIDE);
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
    return `<regex>${this.renderAsSource()}</regex>`;
  }
}
