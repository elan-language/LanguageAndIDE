import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { File } from "../frame-interfaces/file";

export abstract class FixedTextNode extends AbstractParseNode {
  fixedText: string;

  constructor(file: File, fixedText: string) {
    super(file);
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
