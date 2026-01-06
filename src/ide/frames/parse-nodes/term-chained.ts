import { Index } from ".";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DottedTerm } from "./dotted-term";
import { Multiple } from "./multiple";
import { Qualifier } from "./qualifier";
import { TermSimple } from "./term-simple";
import { File } from "../frame-interfaces/file";

export class TermChained extends AbstractSequence {
  chainedHead: Alternatives | undefined;
  tail: Multiple | undefined;

  constructor(file: File) {
    super(file);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const termSimple = () => new TermSimple(this.file);
      const qualifier = () => new Qualifier(this.file);
      this.chainedHead = new Alternatives(this.file, [qualifier, termSimple]);
      const dottedTerm = () => new DottedTerm(this.file);
      const index = () => new Index(this.file);
      const dottedSymbolOrIndex = () => new Alternatives(this.file, [dottedTerm, index]);
      this.tail = new Multiple(this.file, dottedSymbolOrIndex, 1);
      this.addElement(this.chainedHead);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }
}
