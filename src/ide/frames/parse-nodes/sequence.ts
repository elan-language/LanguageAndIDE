import { ParseNode } from "../frame-interfaces/parse-node";
import { AbstractSequence } from "./abstract-sequence";
import { File } from "../frame-interfaces/file";

export class Sequence extends AbstractSequence {
  elementConstructors: (() => ParseNode)[];
  constructor(file: File, elementConstructors: (() => ParseNode)[]) {
    super(file);
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
