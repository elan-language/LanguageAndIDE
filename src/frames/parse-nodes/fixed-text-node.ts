import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export abstract class FixedTextNode extends AbstractParseNode {
  fixedText: string;

  constructor(fixedText: string) {
    super();
    this.fixedText = fixedText;
    this.completionWhenEmpty = fixedText;
  }

  protected getErrorMessage(): string {
    return `must match ${this.fixedText}`;
  }

  getSyntaxCompletionAsHtml(): string {
    return this.status === ParseStatus.empty ? `${this.fixedText}` : "";
  }
}
