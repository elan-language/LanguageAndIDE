import { Regexes } from "../fields/regexes";
import { SymbolCompletionSpec, TokenType } from "../helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierNode extends AbstractParseNode {
  private tokenTypes: TokenType[];

  constructor(tokenTypes: TokenType[]) {
    super();
    this.tokenTypes = tokenTypes;
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
    if (this.isValid() && this.remainingText.length > 0) {
      this._done = true;
    }
  }

  getSymbolCompletionSpecOld(): SymbolCompletionSpec {
    return new SymbolCompletionSpec(this.matchedText, [TokenType.idOrProcedure]);
  }

  getApplicableTokenTypes(): TokenType[] {
    return this.tokenTypes;
  }
}
