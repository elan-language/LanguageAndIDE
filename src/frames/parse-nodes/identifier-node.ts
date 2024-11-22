import { Regexes } from "../fields/regexes";
import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierNode extends AbstractParseNode {
  private tokenTypes: Set<TokenType>;
  private constraintId: () => string;

  constructor(tokenTypes: Set<TokenType> = new Set<TokenType>(), constraintId = () => "") {
    super();
    this.tokenTypes = tokenTypes;
    this.constraintId = constraintId;
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

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return new SymbolCompletionSpec_Old(
      this.matchedText,
      new Set<TokenType>([TokenType.idOrProcedure]),
    );
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }

  symbolCompletion_constraintId(): string {
    return this.constraintId();
  }
}
