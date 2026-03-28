import { AbstractAlternatives } from "./abstract-alternatives";
import { FunctionRefNode } from "./function-ref-node";
import { IdentifierUse } from "./identifier-use";
import { MethodCallNode } from "./method-call-node";
import { allIds } from "./parse-node-helpers";
import { ThisInstance } from "./this-instance";

// A reference node is a variable, or a functionCall, or just 'this'
export class ReferenceNode extends AbstractAlternatives {
  tokenTypes = new Set(allIds);

  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new ThisInstance(this.file));
      this.alternatives.push(new IdentifierUse(this.file, this.tokenTypes));
      this.alternatives.push(new MethodCallNode(this.file));
      this.alternatives.push(new FunctionRefNode(this.file));
      super.parseText(text);
    }
  }
}
