import { SymbolCompletionSpec, TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class OptionalNode extends AbstractParseNode {
  option: ParseNode;
  matchedNode?: ParseNode;

  constructor(option: ParseNode) {
    super();
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
  renderAsSource(): string {
    return this.matchedNode ? this.matchedNode.renderAsSource() : "";
  }

  getCompletionAsHtml(): string {
    const c = this.matchedNode
      ? this.matchedNode.getCompletionAsHtml()
      : super.getCompletionAsHtml();
    return c;
  }

  getSymbolCompletionSpec(): SymbolCompletionSpec {
    return (
      this.matchedNode?.getSymbolCompletionSpec() ?? new SymbolCompletionSpec("", TokenType.none)
    );
  }

  getActiveNode(): ParseNode {
    return this.matchedNode ? this.matchedNode.getActiveNode() : this;
  }
}
