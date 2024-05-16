import { escapeAngleBrackets } from "../helpers";
import { ParseStatus } from "../status-enums";
import { FixedTextNode } from "./fixed-text-node";

export class SymbolNode extends FixedTextNode {
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
      } else if (target.startsWith(text)) {
        this.set(ParseStatus.incomplete, text, "");
      } else {
        this.set(ParseStatus.invalid, "", text, super.getErrorMessage());
      }
    }
  }

  renderAsHtml(): string {
    return escapeAngleBrackets(this.renderAsSource());
  }
}
