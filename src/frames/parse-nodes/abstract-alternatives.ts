import { ParseStatus } from "../status-enums";
import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export abstract class AbstractAlternatives extends AbstractParseNode {
  alternatives: ParseNode[] = [];
  bestMatch?: ParseNode;

  constructor() {
    super();
  }

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
      } else {
        this.bestMatch = undefined;
        this.status = ParseStatus.invalid;
      }
    }
  }

  renderAsHtml(): string {
    return this.bestMatch ? this.bestMatch.renderAsHtml() : "";
  }
  renderAsSource(): string {
    return this.bestMatch ? this.bestMatch.renderAsSource() : "";
  }
  compile(): string {
    return this.bestMatch ? this.bestMatch.compile() : "";
  }
  getSyntaxCompletionAsHtml(): string {
    const c = this.bestMatch
      ? this.bestMatch.getSyntaxCompletionAsHtml()
      : super.getSyntaxCompletionAsHtml();
    return c;
  }

  override symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return this.bestMatch?.symbolCompletion_getSpec_Old() ?? super.symbolCompletion_getSpec_Old();
  }

  override getActiveNode(): ParseNode {
    if (this.bestMatchIsOnlyMatch()) {
      return this.bestMatch!.getActiveNode();
    } else {
      return this as ParseNode;
    }
  }

  bestMatchIsOnlyMatch(): boolean {
    return (
      this.bestMatch !== undefined &&
      this.alternatives.filter((alt) => alt.status !== ParseStatus.invalid).length === 1
    );
  }

  potentialMatches(): ParseNode[] {
    return this.alternatives.filter((alt) => alt.status !== ParseStatus.invalid);
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.potentialMatches().reduce(
      (prev, m) => prev.union(m.symbolCompletion_tokenTypes()),
      new Set<TokenType>(),
    );
  }

  override symbolCompletion_keywords(): Set<string> {
    return this.potentialMatches().reduce(
      (prev, m) => prev.union(m.symbolCompletion_keywords()),
      new Set<string>(),
    );
  }
}
