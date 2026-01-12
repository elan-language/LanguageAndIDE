import { ParseStatus } from "../status-enums";
import { COMMA } from "../symbols";
import { AbstractParseNode } from "./abstract-parse-node";

export class CommaNode extends AbstractParseNode {
  parseText(text: string): void {
    const trim = text.trimStart();
    if (trim.length > 0) {
      if (trim.startsWith(COMMA)) {
        this.status = ParseStatus.valid;
        this._done = true;
        this.matchedText = COMMA;
        text = trim.slice(1);
      } else {
        this.status = ParseStatus.invalid;
        this.remainingText = text;
      }
      text = text.trimStart();
      this.remainingText = text;
    }
  }

  renderAsElanSource(): string {
    return this.matchedText + " ";
  }
}
