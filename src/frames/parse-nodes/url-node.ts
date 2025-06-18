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
      const url = new URL(text);
      this.set(ParseStatus.valid, text, "");
    } catch {
      this.set(ParseStatus.invalid, text, "");
    }
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      switch (text.length) {
        case 1:
          this.validate(["h"], text);
          return;
        case 2:
          this.validate(["ht"], text);
          return;
        case 3:
          this.validate(["htt"], text);
          return;
        case 4:
          this.validate(["http"], text);
          return;
        case 5:
          this.validate(["https", "http:"], text);
          return;
        case 6:
          this.validate(["https:", "http:/"], text);
          return;
        case 7:
          this.validate(["https:/", "http://"], text);
          return;
        default: {
          if (text.startsWith("https://") || text.startsWith("http://")) {
            this.validateUrl(text);
          } else {
            this.set(ParseStatus.invalid, text, "");
          }
          return;
        }
      }
    }
  }

  renderAsSource(): string {
    return this.matchedText; // Overridden to avoid trimming
  }
}
