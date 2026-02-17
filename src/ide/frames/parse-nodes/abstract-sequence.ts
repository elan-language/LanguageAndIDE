import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { File } from "../frame-interfaces/file";

export abstract class AbstractSequence extends AbstractParseNode {
  private elements: ParseNode[] = [];

  constructor(file: File) {
    super(file);
  }

  public addElement(node: ParseNode) {
    this.elements.push(node);
  }

  public getElements(): ParseNode[] {
    return this.elements;
  }

  parseText(text: string): void {
    let i = -1; // Because incremented at start of loop
    this.remainingText = text;
    let continueLoop = true;
    while (this.elements.length > 0 && continueLoop) {
      i++;
      const node = this.elements[i] as AbstractParseNode;
      const firstNode = i === 0;
      const lastNode = i === this.elements.length - 1;
      const nextNode = lastNode ? undefined : this.elements[i + 1];
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
          this.activeNodeForSymbolCompl = nextNode!.getActiveNode();
          continueLoop = true;
        }
      } else if (node.isValid()) {
        if (moreText) {
          if (lastNode) {
            this.status = ParseStatus.valid;
            this._done = true;
            continueLoop = false;
          } else {
            this.activeNodeForSymbolCompl = nextNode!.getActiveNode();
            continueLoop = true;
          }
        } else {
          if (node.matchedText.length > 0 || firstNode) {
            this.activeNodeForSymbolCompl = node.getActiveNode();
          }
          this.status = ParseStatus.valid;
          continueLoop = !lastNode;
        }
      } else if (node.isIncomplete()) {
        continueLoop = false;
        if (moreText) {
          this.status = ParseStatus.invalid;
        } else {
          this.status = ParseStatus.incomplete;
          this.activeNodeForSymbolCompl = node.getActiveNode();
        }
      } else if (node.isEmpty()) {
        if (firstNode) {
          this.status = ParseStatus.empty;
          this.activeNodeForSymbolCompl = node.getActiveNode();
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
    if (this.isInvalid() || this.isEmpty()) {
      this.remainingText = text;
      this.elements = [];
    } else {
      this.matchedText = text.substring(0, text.length - this.remainingText.length);
    }
  }

  renderAsHtml(): string {
    return this.elements.reduce((result, current) => result + current.renderAsHtml(), "");
  }

  renderAsElanSource(): string {
    return this.elements.reduce((result, current) => result + current.renderAsElanSource(), "");
  }

  renderAsExport(): string {
    return this.elements.reduce((result, current) => result + current.renderAsExport(), "");
  }

  getSyntaxCompletionAsHtml(): string {
    const c =
      this.elements.length > 0
        ? this.elements.reduce(
            (result, current) => `${result}${current.getSyntaxCompletionAsHtml()}`,
            "",
          )
        : super.getSyntaxCompletionAsHtml();
    return c;
  }
}
