import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { DotBefore } from "./dot-before";
import { IdentifierNode } from "./identifier-node";
import { IndexSingle } from "./index-single";
import { MethodCallNode } from "./method-call-node";
import { Multiple } from "./multiple";
import { Qualifier } from "./qualifier";
import { TermSimple } from "./term-simple";

export class TermChained extends AbstractSequence {
  head: Alternatives | undefined;
  tail: Multiple | undefined;
  tokenTypes = new Set([TokenType.id_property, TokenType.method_function, TokenType.method_system]);

  parseText(text: string): void {
    if (text.length > 0) {
      const termSimple = () => new TermSimple();
      const qualifier = () => new Qualifier();
      this.head = new Alternatives([qualifier, termSimple]);
      const prop = () => new IdentifierNode(new Set([TokenType.id_property]));
      const method = () => new MethodCallNode();
      const dottedSymbol = () => new DotBefore(new Alternatives([prop, method], this.tokenTypes));
      const index = () => new IndexSingle();
      const dottedSymbolOrIndex = () => new Alternatives([dottedSymbol, index], this.tokenTypes);
      this.tail = new Multiple(dottedSymbolOrIndex, 1);
      this.addElement(this.head);
      this.addElement(this.tail);
      super.parseText(text);
    }
  }
}
