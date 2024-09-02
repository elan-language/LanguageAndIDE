import { escapeAngleBrackets } from "../helpers";
import { POWER } from "../symbols";
import { PunctuationNode } from "./punctuation-node";

export class OperatorNode extends PunctuationNode {
  constructor(operator: string) {
    super(operator);
  }

  renderAsHtml(): string {
    return escapeAngleBrackets(this.renderAsSource());
  }

  renderAsSource(): string {
    return `${this.fixedText}`;
  }

  override compile(): string {
    switch (this.fixedText) {
      case POWER:
        return "**";
      default:
        return this.fixedText;
    }
  }
}
