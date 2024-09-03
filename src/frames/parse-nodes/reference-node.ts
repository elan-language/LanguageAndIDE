import { thisKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { MethodCallNode } from "./method-call-node";

// A reference node is a variable, or a functionCall, or just 'this'
export class ReferenceNode extends AbstractAlternatives {
  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new KeywordNode(thisKeyword));
      this.alternatives.push(new IdentifierNode());
      this.alternatives.push(new MethodCallNode());
      super.parseText(text);
    }
  }
}
