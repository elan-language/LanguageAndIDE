import { TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export abstract class AbstractAlternatives extends AbstractParseNode {
  alternatives: ParseNode[] = [];
  firstBestMatch?: ParseNode;
  additionalBestMatches: ParseNode[] = [];

  constructor() {
    super();
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (this.remainingText.length > 0) {
      let cont = true;
      let i = 0;
      while (i < this.alternatives.length && cont) {
        const alt = this.alternatives[i];
        alt.parseText(text);
        if (alt.status === ParseStatus.valid && alt.remainingText.length === 0) {
          this.firstBestMatch = alt;
          cont = false;
        } else if (!this.firstBestMatch) {
          this.firstBestMatch = alt;
        } else if (
          alt.remainingText.length < this.firstBestMatch.remainingText.length ||
          (alt.remainingText.length === this.firstBestMatch.remainingText.length &&
            alt.status > this.firstBestMatch.status)
        ) {
          this.firstBestMatch = alt;
          this.additionalBestMatches = [];
        } else if (
          alt.remainingText.length === this.firstBestMatch.remainingText.length &&
          alt.status === this.firstBestMatch.status
        ) {
          this.additionalBestMatches.push(alt);
        }
        i++;
      }
      if (this.firstBestMatch!.status > ParseStatus.invalid) {
        this.status = this.firstBestMatch!.status;
        this.matchedText = this.firstBestMatch!.matchedText;
        this.remainingText = this.firstBestMatch!.remainingText;
      } else {
        this.firstBestMatch = undefined;
        this.status = ParseStatus.invalid;
      }
    }
  }

  renderAsHtml(): string {
    return this.firstBestMatch ? this.firstBestMatch.renderAsHtml() : "";
  }
  renderAsSource(): string {
    return this.firstBestMatch ? this.firstBestMatch.renderAsSource() : "";
  }
  compile(): string {
    return this.firstBestMatch ? this.firstBestMatch.compile() : "";
  }
  getCompletionAsHtml(): string {
    const c = this.firstBestMatch
      ? this.firstBestMatch.getCompletionAsHtml()
      : super.getCompletionAsHtml();
    return c;
  }

  override getToMatchAndTokenType(): [string, TokenType] {
    return this.firstBestMatch?.getToMatchAndTokenType() ?? super.getToMatchAndTokenType();
  }

  getActiveNode(): ParseNode {
    return this.firstBestMatch ? this.firstBestMatch!.getActiveNode() : this;
  }
}
