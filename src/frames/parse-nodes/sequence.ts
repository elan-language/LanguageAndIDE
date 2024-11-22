import { SymbolCompletionSpec_Old } from "../symbol-completion-helpers";
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

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    const elems = this.getElements();

    return elems[elems.length - 1].symbolCompletion_getSpec_Old();
  }
}
