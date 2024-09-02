import { thisKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { KeywordNode } from "./keyword-node";
import { MethodCallNode2 } from "./method-call-node2";
import { OptionalNode } from "./optional-node";

// A reference node is a variable, or a functionCall, or 'this, with an optional index
export class ReferenceNode extends AbstractSequence {
  reference: Alternatives | undefined;
  index: OptionalNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      const identifier = () => new IdentifierNode();
      const methodCall = () => new MethodCallNode2();
      const thisRef = () => new KeywordNode(thisKeyword);
      this.reference = new Alternatives([thisRef, identifier, methodCall]);
      this.index = new OptionalNode(new IndexNode());
      this.addElement(this.reference);
      this.addElement(this.index);
      super.parseText(text);
    }
  }
}
