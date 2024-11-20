import { TokenType } from "../helpers";
import { thisKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { FunctionRefNode } from "./function-ref-node";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { MethodCallNode } from "./method-call-node";

// A reference node is a variable, or a functionCall, or just 'this'
export class ReferenceNode extends AbstractAlternatives {
  tokenTypes = [
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ];

  parseText(text: string): void {
    if (text.length > 0) {
      this.alternatives.push(new KeywordNode(thisKeyword));
      this.alternatives.push(new IdentifierNode(this.tokenTypes));
      this.alternatives.push(new MethodCallNode());
      this.alternatives.push(new FunctionRefNode());
      super.parseText(text);
    }
  }
}
