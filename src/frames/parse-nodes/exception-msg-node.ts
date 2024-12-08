import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { LitStringNonEmpty } from "./lit-string-non-empty";

export class ExceptionMsgNode extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_variable,
  ]);
  constructor() {
    super();
    this.alternatives.push(new LitStringNonEmpty());
    this.alternatives.push(new IdentifierNode(this.tokenTypes));
  }
}
