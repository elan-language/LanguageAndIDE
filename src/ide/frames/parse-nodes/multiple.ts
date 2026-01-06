import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class Multiple extends AbstractParseNode {
  elementConstructor: () => ParseNode;
  minimum: number;
  private elements: ParseNode[] = [];

  constructor(elementConstructor: () => ParseNode, minimum: number) {
    super();
    this.elementConstructor = elementConstructor;
    this.minimum = minimum;
  }

  public getElements(): ParseNode[] {
    return this.elements;
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length === 0) {
      this.status = this.minimum === 0 ? ParseStatus.valid : ParseStatus.empty;
    } else {
      let toParse = text;
      let cont = true;
      while (cont && toParse.length > 0) {
        const node = this.elementConstructor();
        node.parseText(toParse);
        if (node.status === ParseStatus.valid) {
          this.elements.push(node);
          toParse = node.remainingText;
          this.activeNodeForSymbolCompl = node.getActiveNode();
        } else if (node.status === ParseStatus.incomplete && node.remainingText.trim() === "") {
          this.elements.push(node);
          toParse = node.remainingText;
          this.activeNodeForSymbolCompl = node.getActiveNode();
        } else {
          cont = false;
        }
        if (this.elements.length === 0 && this.minimum === 0) {
          this.status = ParseStatus.valid;
          this.remainingText = toParse;
        } else if (this.elements.length >= this.minimum) {
          const last = this.elements[this.elements.length - 1];
          this.status = last.status;
          const matchedLength = text.length - toParse.length;
          this.matchedText = text.substring(0, matchedLength);
          this.remainingText = toParse;
        } else {
          this.status = ParseStatus.invalid;
          this.remainingText = text;
        }
      }
    }
  }

  renderAsHtml(): string {
    return this.elements.reduce((result, current) => result + current.renderAsHtml(), "");
  }
  renderAsElanSource(): string {
    return this.elements.reduce((result, current) => result + current.renderAsElanSource(), "");
  }

  getSyntaxCompletionAsHtml(): string {
    return this.elements.reduce(
      (result, current) => `${result}${current.getSyntaxCompletionAsHtml()}`,
      "",
    );
  }

  getActiveNode(): ParseNode {
    const n = this.elements.length;
    return n > 0 ? this.elements[n - 1].getActiveNode() : this;
  }
}
