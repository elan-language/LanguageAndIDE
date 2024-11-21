import { SymbolCompletionSpec, SymbolCompletionSpec_Old, TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { ParseNode } from "./parse-node";

export abstract class AbstractParseNode implements ParseNode {
  status: ParseStatus = ParseStatus.empty;
  matchedText: string = "";
  completionWhenEmpty: string = "";
  remainingText: string = "";
  errorMessage: string = "";
  activeNodeForSymbolCompl: ParseNode = this;
  //Complete means that parseNode is valid and that no more text may be taken
  //By default, parse nodes are never complete. Only ones that can return true are:
  //SpaceNode and sub-classes of FixedTextNode or of AbstractSequence
  _done: boolean = false;

  setSyntaxCompletionWhenEmpty(ph: string) {
    this.completionWhenEmpty = ph;
  }

  getSyntaxCompletionAsHtml(): string {
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

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return new SymbolCompletionSpec_Old("", new Set<TokenType>([TokenType.none]));
  }

  symbolCompletion_getSpec(): SymbolCompletionSpec {
    const active = this.getActiveNode();
    const isThis = active === this;
    const toMatch = isThis ? "" : active.symbolCompleton_toMatch();
    const tokens = isThis ? new Set<TokenType>() : active.symbolCompletion_tokenTypes();
    const keywords = isThis ? [] : active.symbolCompleton_keywords();
    const constraintId = isThis ? "" : active.symbolCompleton_constraintId();
    return new SymbolCompletionSpec(toMatch, tokens, keywords, constraintId);
  }

  symbolCompleton_toMatch(): string {
    return this.matchedText;
  }
  symbolCompletion_tokenTypes(): Set<TokenType> {
    return new Set<TokenType>();
  }
  symbolCompleton_keywords(): string[] {
    return [];
  }
  symbolCompleton_constraintId(): string {
    return "";
  }

  getActiveNode(): ParseNode {
    const active = this.activeNodeForSymbolCompl;
    return active === this ? active : active.getActiveNode();
  }

  isDone(): boolean {
    return this._done;
  }
  isValid(): boolean {
    return this.status === ParseStatus.valid;
  }
  isIncomplete(): boolean {
    return this.status === ParseStatus.incomplete;
  }
  isEmpty(): boolean {
    return this.status === ParseStatus.empty;
  }
  isInvalid(): boolean {
    return this.status === ParseStatus.invalid;
  }
}
