import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export abstract class AbstractSequence extends AbstractParseNode {
  private elements: ParseNode[] = [];

  protected addElement(node: ParseNode) {
    this.elements.push(node);
  }

  public getElements(): ParseNode[] {
    return this.elements;
  }

  parseText(text: string): void {
    let i = 0; //Index
    let remaining = text;
    let worstStatus: ParseStatus = ParseStatus.default;
    while (i < this.elements.length && worstStatus >= ParseStatus.valid) {
      const node = this.elements[i];
      node.parseText(remaining);
      remaining = node.remainingText;
      if (node.status === ParseStatus.empty) {
        worstStatus =
          worstStatus === ParseStatus.default ? ParseStatus.empty : ParseStatus.incomplete;
      } else {
        worstStatus = node.status < worstStatus ? node.status : worstStatus;
      }
      i++;
    }
    this.status = worstStatus;
    if (worstStatus > ParseStatus.invalid) {
      this.remainingText = remaining;
      this.matchedText = text.substring(0, text.length - this.remainingText.length);
    } else {
      this.remainingText = text;
    }
  }
  renderAsHtml(): string {
    return this.elements.reduce((result, current) => result + current.renderAsHtml(), "");
  }
  renderAsSource(): string {
    return this.elements.reduce((result, current) => result + current.renderAsSource(), "");
  }
  compile(): string {
    return this.elements.reduce((result, current) => result + current.compile(), "");
  }
  getCompletionAsHtml(): string {
    return this.elements.length > 0
      ? this.elements.reduce((result, current) => `${result}${current.getCompletionAsHtml()}`, "")
      : super.getCompletionAsHtml();
  }
}
