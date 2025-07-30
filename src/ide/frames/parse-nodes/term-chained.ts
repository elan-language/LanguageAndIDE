import { Index } from ".";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DottedTerm } from "./dotted-term";
import { Multiple } from "./multiple";
import { Qualifier } from "./qualifier";
import { TermSimple } from "./term-simple";

export class TermChained extends AbstractSequence {
  chainedHead: Alternatives | undefined;
  tail: Multiple | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const termSimple = () => new TermSimple();
      const qualifier = () => new Qualifier();
      this.chainedHead = new Alternatives([qualifier, termSimple]);
      const dottedTerm = () => new DottedTerm();
      const index = () => new Index();
      const dottedSymbolOrIndex = () => new Alternatives([dottedTerm, index]);
      this.tail = new Multiple(dottedSymbolOrIndex, 1);
      this.addElement(this.chainedHead);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }
}
