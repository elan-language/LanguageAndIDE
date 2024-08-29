import { Regexes } from "../fields/regexes";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitRegEx extends AbstractParseNode {
  constructor() {
    super();
    this.completionWhenEmpty = `"regular expression"`;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text,
        Regexes.regexExpression,
      );
    }
  }
  
  renderAsHtml(): string {
    return `<regex>${this.renderAsSource()}</regex>`;
  }
}
