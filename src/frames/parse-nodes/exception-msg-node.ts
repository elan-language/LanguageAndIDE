import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { LitString } from "./lit-string";

export class ExceptionMsgNode extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_variable,
  ]);
  constructor() {
    super();
    this.alternatives.push(new LitString());
    this.alternatives.push(new IdentifierNode(this.tokenTypes));
  }
}
