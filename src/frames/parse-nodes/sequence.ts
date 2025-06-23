import { ParseNode } from "../frame-interfaces/parse-node";
import { AbstractSequence } from "./abstract-sequence";

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
}
