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
    let i = -1; // Because incremented at start of loop
    this.remainingText = text;
    let continueToNextNode = true;
    while (continueToNextNode) {
      i++;
      const node = this.elements[i] as AbstractParseNode;
      this.activeSubNode = node;
      const lastNode = i === this.elements.length - 1;
      node.parseText(this.remainingText);
      this.remainingText = node.remainingText;
      const moreText = this.remainingText.length > 0;
      continueToNextNode = false; //default - unless set true again below
      if (node.isComplete()) {
        // Only possible if also valid
        if (lastNode) {
          this.status = ParseStatus.valid;
          this.complete = true;
        } else {
          this.status = ParseStatus.incomplete;
          continueToNextNode = true;
        }
      } else if (node.isValid()) { 
        this.status = ParseStatus.valid;
        if (moreText) {
          if (lastNode) {
            this.complete = true;
          } else {
            continueToNextNode = true;
          }
        }
      } else if (node.isIncomplete()) {
        if (moreText) {
          this.status = ParseStatus.invalid;
        } else {
          this.status = ParseStatus.incomplete;
        }
      } else if (node.isEmpty()) {
        if (i === 0) {
          this.status = ParseStatus.empty;
        } else {
          this.status = ParseStatus.incomplete;
        }
      } else if (node.isInvalid()) {
        this.status = ParseStatus.invalid;
      }
    } //Finally...
    if (this.isInvalid()) {
      this.remainingText = text; 
    } else {
      this.matchedText = text.substring(0, text.length - this.remainingText.length);
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
    const c =
      this.elements.length > 0
        ? this.elements.reduce((result, current) => `${result}${current.getCompletionAsHtml()}`, "")
        : super.getCompletionAsHtml();
    return c;
  }
}
