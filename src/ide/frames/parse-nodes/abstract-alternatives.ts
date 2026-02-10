import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";

export abstract class AbstractAlternatives extends AbstractParseNode {
  alternatives: ParseNode[] = [];
  bestMatch?: ParseNode;

  parseText(text: string): void {
    this.remainingText = text;
    if (this.remainingText.length > 0) {
      let open = true;
      let i = 0;
      while (i < this.alternatives.length) {
        const alt = this.alternatives[i];
        alt.parseText(text);
        if (open) {
          if (alt.isValid() && alt.remainingText.length === 0) {
            this.bestMatch = alt;
            open = false;
            this._done = alt.isDone();
          } else if (
            !this.bestMatch ||
            alt.remainingText.length < this.bestMatch.remainingText.length ||
            (alt.remainingText.length === this.bestMatch.remainingText.length &&
              alt.status > this.bestMatch.status)
          ) {
            this.bestMatch = alt;
          }
        }
        i++;
      }
      if (this.bestMatch!.status > ParseStatus.invalid) {
        this.status = this.bestMatch!.status;
        this.matchedText = this.bestMatch!.matchedText;
        this.remainingText = this.bestMatch!.remainingText;
        this.alternatives = this.alternatives.filter((alt) => alt.status > ParseStatus.invalid);
      } else {
        this.bestMatch = undefined;
        this.status = ParseStatus.invalid;
        this.alternatives = [];
      }
    }
    //finally
    if (this.isDone()) {
      this.alternatives = [];
    }
  }

  renderAsHtml(): string {
    return this.bestMatch ? this.bestMatch.renderAsHtml() : "";
  }

  renderAsElanSource(): string {
    return this.bestMatch ? this.bestMatch.renderAsElanSource() : "";
  }

  getSyntaxCompletionAsHtml(): string {
    const c = this.bestMatch
      ? this.bestMatch.getSyntaxCompletionAsHtml()
      : super.getSyntaxCompletionAsHtml();
    return c;
  }

  override getActiveNode(): ParseNode {
    if (this.bestMatchIsOnlyMatch()) {
      return this.bestMatch?.getActiveNode() ?? this;
    } else {
      return this;
    }
  }

  bestMatchIsOnlyMatch(): boolean {
    return this.potentialMatches().length === 1;
  }

  potentialMatches(): ParseNode[] {
    const best = this.bestMatch;
    const bestMatchLength = best ? best.matchedText.length : 0;
    return this.alternatives.filter(
      (alt) => alt.status !== ParseStatus.invalid && alt.matchedText.length === bestMatchLength,
    );
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.potentialMatches().reduce(
      (prev, m) => prev.union(m.symbolCompletion_tokenTypes()),
      new Set<TokenType>(),
    );
  }

  override symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.potentialMatches().reduce(
      (prev, m) => prev.union(m.symbolCompletion_keywords()),
      new Set<KeywordCompletion>(),
    );
  }
}
