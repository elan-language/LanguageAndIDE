import { TokenType } from "../helpers";
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { Multiple } from "./multiple";
import { OptionalNode } from "./optional-node";
import { ParseNode } from "./parse-node";
import { Sequence } from "./sequence";

//A list of comma-separated values of a specified type, but with no list delimiters
export class CSV extends AbstractSequence {
  elementConstructor: () => ParseNode;
  minimum: number;

  constructor(elementConstructor: () => ParseNode, minimum: number) {
    super();
    this.elementConstructor = elementConstructor;
    this.minimum = minimum;
  }

  parseText(text: string): void {
    this.remainingText = text;
    let commaNodesMin = 0;
    const commaNode = () => new Sequence([() => new CommaNode(), this.elementConstructor]);

    if (this.minimum === 0) {
      this.addElement(new OptionalNode(this.elementConstructor()));
    } else {
      this.addElement(this.elementConstructor());
      commaNodesMin = this.minimum - 1;
    }
    this.addElement(new Multiple(commaNode, commaNodesMin));
    super.parseText(text);
  }

  getCompletionAsHtml(): string {
    let comp = super.getCompletionAsHtml();
    if (this.minimum > 0 && this.matchedText.length === 0) {
      const el = this.elementConstructor();
      comp = el.getCompletionAsHtml();
    }
    return comp;
  }

  getSymbolCompletionSpec(): [string, TokenType] {
    const elems = this.getElements();
    if (elems.length === 0) {
      return ["", TokenType.none];
    }

    if (elems.length === 2) {
      if ((elems[1] as Multiple).getElements().length > 0) {
        return elems[1].getSymbolCompletionSpec();
      }
    }

    return elems[0].getSymbolCompletionSpec();
  }
}
