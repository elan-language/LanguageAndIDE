import { ParseNode } from "../frame-interfaces/parse-node";
import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { IdentifierNode } from "./identifier-node";
import { MethodCallNode } from "./method-call-node";
import { PunctuationNode } from "./punctuation-node";

export class DottedTerm extends AbstractSequence {
  term: ParseNode;
  tokenTypes = new Set([TokenType.id_property, TokenType.method_function, TokenType.method_system]);

  constructor() {
    super();
    const prop = () => new IdentifierNode(new Set([TokenType.id_property]));
    const method = () => new MethodCallNode();
    this.term = new Alternatives([prop, method], this.tokenTypes);
  }
  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(DOT));
      this.addElement(this.term);
      super.parseText(text);
    }
  }
}
