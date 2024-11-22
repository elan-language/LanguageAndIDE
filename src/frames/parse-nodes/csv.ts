import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
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

  getSyntaxCompletionAsHtml(): string {
    let comp = super.getSyntaxCompletionAsHtml();
    if (this.minimum > 0 && this.matchedText.length === 0) {
      const el = this.elementConstructor();
      comp = el.getSyntaxCompletionAsHtml();
    }
    return comp;
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    const elems = this.getElements();
    if (elems.length === 0) {
      return new SymbolCompletionSpec_Old("", new Set<TokenType>([TokenType.none]));
    }

    if (elems.length === 2) {
      if ((elems[1] as Multiple).getElements().length > 0) {
        return elems[1].symbolCompletion_getSpec_Old();
      }
    }

    return elems[0].symbolCompletion_getSpec_Old();
  }
}
