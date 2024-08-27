import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { MethodCallNode2 } from "./method-call-node2";
import { OptionalNode } from "./optional-node";

// Here 'symbol' refers to an entry in the symbol table. It has an optional index term.
export class SymbolNode extends AbstractSequence {
  symbol: Alternatives | undefined;
  index: OptionalNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const identifier = () => new IdentifierNode();
      const methodCall = () => new MethodCallNode2();
      this.symbol = new Alternatives([identifier, methodCall]);
      this.index = new OptionalNode(new IndexNode());
      this.addElement(this.symbol);
      this.addElement(this.index);
      super.parseText(text);
    }
  }
}
