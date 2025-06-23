import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class UrlNode extends AbstractParseNode {
  constructor() {
    super();
  }

  validateUrl(text: string) {
    try {
      let url = text;
      let remainingText = "";
      const firstSpace = text.indexOf(" ");
      if (firstSpace > 0) {
        url = text.slice(0, firstSpace);
        remainingText = text.slice(firstSpace);
      }

      new URL(url);
      this.set(ParseStatus.valid, url, remainingText);
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
      } else if (text.length === 8 && text.startsWith("https://")) {
        this.set(ParseStatus.incomplete, text, "");
      } else {
        if (text.startsWith("https://") || text.startsWith("http://")) {
          this.validateUrl(text);
        } else {
          this.set(ParseStatus.invalid, text, "");
        }
      }
    }
  }
}
