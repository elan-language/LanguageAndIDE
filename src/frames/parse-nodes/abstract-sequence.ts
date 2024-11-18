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
    let continueLoop = true;
    while (continueLoop) {
      i++;
      const node = this.elements[i] as AbstractParseNode;
      const firstNode = i === 0;
      const lastNode = i === this.elements.length - 1;
      const nextNode = lastNode? undefined : this.elements[i+1];
      node.parseText(this.remainingText);
      this.remainingText = node.remainingText;
      const moreText = this.remainingText.length > 0;
      if (node.isDone()) {  
        if (lastNode) {
          this.status = ParseStatus.valid;
          this._done = true;
          continueLoop = false;
        } else {
          this.status = ParseStatus.incomplete;
          this.activeNodeForSymbolCompl = nextNode!;
          continueLoop = true;
        }
      } else if (node.isValid()) { 
        if (moreText) {
          if (lastNode) {
            this.status = ParseStatus.valid;
            this._done = true;
            continueLoop = false;
          } else {
            this.activeNodeForSymbolCompl = nextNode!;
            continueLoop = true;
          }
        } else { //No more text
          this.activeNodeForSymbolCompl = node;
          this.status = ParseStatus.valid;
          continueLoop = !lastNode;
        }
      } else if (node.isIncomplete()) {
        continueLoop = false;
        if (moreText) {
          this.status = ParseStatus.invalid;
        } else {
          this.status = ParseStatus.incomplete;
          this.activeNodeForSymbolCompl = node;
        }
      } else if (node.isEmpty()) {
        if (firstNode) {
          this.status = ParseStatus.empty;
          this.activeNodeForSymbolCompl = node;
        } else {
          this.status = ParseStatus.incomplete;
          // activeNodeForSymbolCompl unchanged
        }
        continueLoop = false;
      } else if (node.isInvalid()) {
        this.status = ParseStatus.invalid;
        continueLoop = false;
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
