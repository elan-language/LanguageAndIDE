import { ParseStatus } from "../status-enums";
import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

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
  renderAsSource(): string {
    return this.elements.reduce((result, current) => result + current.renderAsSource(), "");
  }

  getSyntaxCompletionAsHtml(): string {
    return this.elements.reduce(
      (result, current) => `${result}${current.getSyntaxCompletionAsHtml()}`,
      "",
    );
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    const elems = this.getElements();
    if (elems.length === 0) {
      return new SymbolCompletionSpec_Old("", new Set<TokenType>([TokenType.none]));
    }
    return elems[elems.length - 1].symbolCompletion_getSpec_Old();
  }

  getActiveNode(): ParseNode {
    const n = this.elements.length;
    return n > 0 ? this.elements[n - 1].getActiveNode() : this;
  }
}
