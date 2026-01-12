import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { File } from "../frame-interfaces/file";

export class OptionalNode extends AbstractParseNode {
  option: ParseNode;
  matchedNode?: ParseNode;

  constructor(file: File, option: ParseNode) {
    super(file);
    this.option = option;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const option = this.option;
      option.parseText(text);
      if (
        option.status === ParseStatus.valid ||
        (option.status === ParseStatus.incomplete && option.remainingText.trim() === "")
      ) {
        this._done = option.isDone();
        this.updateFrom(option);
        this.matchedNode = option;
      } else {
        this.status = ParseStatus.valid;
        this.remainingText = text;
        this._done = true;
      }
    } else {
      this.status = ParseStatus.valid;
    }
  }
  renderAsHtml(): string {
    return this.matchedNode ? this.matchedNode.renderAsHtml() : "";
  }
  renderAsElanSource(): string {
    return this.matchedNode ? this.matchedNode.renderAsElanSource() : "";
  }

  getSyntaxCompletionAsHtml(): string {
    const c = this.matchedNode
      ? this.matchedNode.getSyntaxCompletionAsHtml()
      : super.getSyntaxCompletionAsHtml();
    return c;
  }

  getActiveNode(): ParseNode {
    return this.matchedNode ? this.matchedNode.getActiveNode() : this;
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.option.symbolCompletion_tokenTypes();
  }

  override symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.option.symbolCompletion_keywords();
  }
}
