import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotBefore } from "./dot-before";
import { IndexSingle } from "./index-single";
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
      this.head = new Alternatives([qualifier, termSimple]);

      const dottedSymbol = () => new DotBefore(new ReferenceNode());
      const index = () => new IndexSingle();
      const dottedSymbolOrIndex = () => new Alternatives([dottedSymbol, index]);
      this.tail = new Multiple(dottedSymbolOrIndex, 1);
      this.addElement(this.head);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return new SymbolCompletionSpec_Old(
      this.matchedText,
      new Set<TokenType>([TokenType.expression]),
    );
  }
}
