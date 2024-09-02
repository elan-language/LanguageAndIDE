import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotBefore } from "./dot-before";
import { Multiple } from "./multiple";
import { Qualifier } from "./qualifier";
import { ReferenceNode } from "./reference-node";
import { TermSimple } from "./term-simple";

export class TermChained extends AbstractSequence {
  head: Alternatives | undefined;
  tail: Multiple | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const termSimple = () => new TermSimple();
      const qualifier = () => new Qualifier();
      const dottedSymbol = () => new DotBefore(new ReferenceNode());

      this.head = new Alternatives([qualifier, termSimple]);
      this.tail = new Multiple(dottedSymbol, 1);
      this.addElement(this.head);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }
}
