import { escapeHtmlChars } from "../frame-helpers";
import { ParseStatus } from "../status-enums";
import { FixedTextNode } from "./fixed-text-node";

export class PunctuationNode extends FixedTextNode {
  constructor(symbol: string) {
    super(symbol);
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const target = this.fixedText;
      if (text.startsWith(target)) {
        const n = this.numLeadingSpaces(text) + this.fixedText.length;
        this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
        this._done = true;
      } else if (target.startsWith(text)) {
        this.set(ParseStatus.incomplete, text, "");
      } else {
        this.set(ParseStatus.invalid, "", text);
      }
    }
  }

  renderAsHtml(): string {
    return escapeHtmlChars(this.renderAsElanSource());
  }

  getSyntaxCompletionAsHtml(): string {
    let comp = ``;
    const matched = this.matchedText.length;
    const kw = this.fixedText.length;
    if (matched === 0) {
      comp = `${this.fixedText}`;
    } else if (matched === kw && this.remainingText === "") {
      comp = ``;
    } else if (matched < kw) {
      comp = `${this.fixedText.substring(this.matchedText.length)}`;
    }
    return comp;
  }
}
