import { SymbolCompletionSpec } from "../helpers";
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";

export class Sequence extends AbstractSequence {
  elementConstructors: (() => ParseNode)[];
  constructor(elementConstructors: (() => ParseNode)[]) {
    super();
    this.elementConstructors = elementConstructors;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.elementConstructors.forEach((ec) => {
        this.addElement(ec());
      });
    }
    super.parseText(text);
  }

  getSymbolCompletionSpec(): SymbolCompletionSpec {
    const elems = this.getElements();

    return elems[elems.length - 1].getSymbolCompletionSpec();
  }
}
