import { TokenType } from "../helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { IndexSingle } from "./index-single";
import { OptionalNode } from "./optional-node";

export class InstanceNode extends AbstractSequence {
  variable: IdentifierNode | undefined;
  index: OptionalNode | undefined;
  tokenTypes = [
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_property,
    TokenType.id_variable,
  ];

  parseText(text: string): void {
    if (text.length > 0) {
      this.variable = new IdentifierNode(this.tokenTypes);
      this.index = new OptionalNode(new IndexSingle());
      this.addElement(this.variable);
      this.addElement(this.index);
      super.parseText(text);
    }
  }
}
