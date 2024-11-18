import { Regexes } from "../fields/regexes";
import { TokenType } from "../helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierNode extends AbstractParseNode {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>name</i>";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text.trimStart(),
        Regexes.identifier,
      );
    }
    if (this.remainingText.length > 0) {
      this._done = true;
    }
  }

  getToMatchAndTokenType(): [string, TokenType] {
    return [this.matchedText, TokenType.idOrProcedure];
  }
}
