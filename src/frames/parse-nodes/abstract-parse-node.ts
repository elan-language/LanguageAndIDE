import { ParseStatus } from "../status-enums";
import {
  SymbolCompletionSpec,
  SymbolCompletionSpec_Old,
  TokenType,
} from "../symbol-completion-helpers";
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
    const toMatch = isThis ? this.symbolCompletion_toMatch() : active.symbolCompletion_toMatch();
    const tokens = isThis
      ? this.symbolCompletion_tokenTypes()
      : active.symbolCompletion_tokenTypes();
    const keywords = isThis ? this.symbolCompletion_keywords() : active.symbolCompletion_keywords();
    const constraintId = isThis
      ? this.symbolCompletion_constraintId()
      : active.symbolCompletion_constraintId();
    return new SymbolCompletionSpec(toMatch, tokens, keywords, constraintId);
  }

  symbolCompletion_toMatch(): string {
    const active = this.getActiveNode();
    return active === this ? this.matchedText : active.symbolCompletion_toMatch();
  }
  symbolCompletion_tokenTypes(): Set<TokenType> {
    const active = this.getActiveNode();
    return active === this ? new Set<TokenType>() : active.symbolCompletion_tokenTypes();
  }
  symbolCompletion_keywords(): Set<string> {
    const active = this.getActiveNode();
    return active === this ? new Set<string>() : active.symbolCompletion_keywords();
  }
  symbolCompletion_constraintId(): string {
    const active = this.getActiveNode();
    return active === this ? "" : active.symbolCompletion_constraintId();
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
