import { removeHtmlTags } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion, SymbolCompletionSpec, TokenType } from "../symbol-completion-helpers";

export abstract class AbstractParseNode implements ParseNode {
  status: ParseStatus = ParseStatus.empty;
  matchedText: string = "";
  completionWhenEmpty: string = "";
  remainingText: string = "";

  activeNodeForSymbolCompl: ParseNode = this;
  //'done' means that parseNode is valid and that no more text may be taken
  //Most parse nodes are never 'done'. Only ones that can return true are:
  //SpaceNode and sub-classes of FixedTextNode or of AbstractSequence
  _done: boolean = false;

  constructor(public readonly file: File) {}

  setSyntaxCompletionWhenEmpty(ph: string) {
    this.completionWhenEmpty = ph;
  }

  getSyntaxCompletionAsHtml(): string {
    return this.matchedText === "" ? `${this.completionWhenEmpty}` : "";
  }

  renderAsElanSource(): string {
    return this.matchedText.trim();
  }

  renderAsExport(): string {
    return this.matchedText.trim();
  }

  renderAsHtml(): string {
    return this.renderAsElanSource();
  }

  abstract parseText(text: string): void;

  protected set(status: ParseStatus, matched: string, remaining: string) {
    this.status = status;
    this.matchedText = matched;
    this.remainingText = remaining;
  }

  protected numLeadingSpaces(text: string): number {
    return text.length - text.trimStart().length;
  }

  protected updateFrom(other: ParseNode) {
    this.status = other.status;
    this.matchedText = other.matchedText;
    this.remainingText = other.remainingText;
  }

  symbolCompletion_getSpec(): SymbolCompletionSpec {
    const active = this.getActiveNode();
    const isThis = active === this;
    const toMatch = isThis ? this.symbolCompletion_toMatch() : active.symbolCompletion_toMatch();
    const tokens = isThis
      ? this.symbolCompletion_tokenTypes()
      : active.symbolCompletion_tokenTypes();
    const keywords = isThis ? this.symbolCompletion_keywords() : active.symbolCompletion_keywords();
    const context = isThis ? this.symbolCompletion_context() : active.symbolCompletion_context();
    const spec = new SymbolCompletionSpec(toMatch, tokens, keywords, context);
    return spec;
  }

  symbolCompletion_toMatch(): string {
    const active = this.getActiveNode();
    return active === this ? this.matchedText : active.symbolCompletion_toMatch();
  }
  symbolCompletion_tokenTypes(): Set<TokenType> {
    const active = this.getActiveNode();
    return active === this ? new Set<TokenType>() : active.symbolCompletion_tokenTypes();
  }
  symbolCompletion_keywords(): Set<KeywordCompletion> {
    const active = this.getActiveNode();
    return active === this ? new Set<KeywordCompletion>() : active.symbolCompletion_keywords();
  }
  symbolCompletion_context(): string {
    const active = this.getActiveNode();
    return active === this ? "" : active.symbolCompletion_context();
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
