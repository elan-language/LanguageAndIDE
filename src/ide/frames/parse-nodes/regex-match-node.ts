import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";
import { File } from "../frame-interfaces/file";

export class RegExMatchNode extends AbstractParseNode {
  regx: RegExp;

  constructor(file: File, regx: RegExp) {
    super(file);
    this.regx = regx;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.regx);
    }
  }

  renderAsElanSource(): string {
    return this.matchedText; // Overridden to avoid trimming
  }
}
