import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class UrlNode extends AbstractParseNode {
  constructor() {
    super();
  }

  validate(toMatch: string[], text: string) {
    if (toMatch.includes(text)) {
      this.set(ParseStatus.incomplete, text, "");
    } else {
      this.set(ParseStatus.invalid, text, "");
    }
  }

  validateUrl(text: string) {
    try {
      const url = text.split(" ");
      const remainingText = url.length === 1 ? "" : url.slice(1).join("");

      new URL(url[0]);
      this.set(ParseStatus.valid, text, remainingText);
    } catch {
      this.set(ParseStatus.invalid, text, "");
    }
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      if (text.length <= 7) {
        if ("https:/".startsWith(text) || "http://".startsWith(text)) {
          this.set(ParseStatus.incomplete, text, "");
        } else {
          this.set(ParseStatus.invalid, text, "");
        }
      } else if (text.length === 8) {
        if (text.startsWith("https://")) {
          this.set(ParseStatus.incomplete, text, "");
        } else if (text.startsWith("http://")) {
          this.validateUrl(text);
        } else {
          this.set(ParseStatus.invalid, text, "");
        }
      } else {
        if (text.startsWith("https://") || text.startsWith("http://")) {
          this.validateUrl(text);
        } else {
          this.set(ParseStatus.invalid, text, "");
        }
      }
    }
  }

  renderAsSource(): string {
    return this.matchedText; // Overridden to avoid trimming
  }
}
