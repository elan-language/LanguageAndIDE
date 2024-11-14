import { TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { ParseNode } from "./parse-node";

export abstract class AbstractParseNode implements ParseNode {
  status: ParseStatus = ParseStatus.empty;
  matchedText: string = "";
  completionWhenEmpty: string = "";
  remainingText: string = "";
  errorMessage: string = "";
  activeSubNode: ParseNode = this;

  setCompletionWhenEmpty(ph: string) {
    this.completionWhenEmpty = ph;
  }

  getCompletionAsHtml(): string {
    return this.matchedText === "" ? `${this.completionWhenEmpty}` : "";
  }

  renderAsSource(): string {
    return this.matchedText.trim();
  }

  renderAsHtml(): string {
    return this.renderAsSource();
  }

  abstract parseText(text: string): void;

  compile(): string {
    return this.matchedText.trim();
  } //TODO make abstract

  protected set(status: ParseStatus, matched: string, remaining: string, errorMessage = "") {
    this.status = status;
    this.matchedText = matched;
    this.remainingText = remaining;
    this.errorMessage = errorMessage;
  }

  protected numLeadingSpaces(text: string): number {
    return text.length - text.trimStart().length;
  }

  protected updateFrom(other: ParseNode) {
    this.status = other.status;
    this.matchedText = other.matchedText;
    this.remainingText = other.remainingText;
    this.errorMessage = other.errorMessage;
  }

  getToMatchAndTokenType(): [string, TokenType] {
    return ["", TokenType.none];
  }

  getActiveNode(): ParseNode {
    const active = this.activeSubNode;
    return active === this ? active : active.getActiveNode();
  }
}
