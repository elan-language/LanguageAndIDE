import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierUse } from "./identifier-use";
import { LitString } from "./lit-string";

export class ExceptionMsgNode extends AbstractAlternatives {
  tokenTypes: Set<TokenType> = new Set<TokenType>([
    TokenType.id_constant,
    TokenType.id_let,
    TokenType.id_variable,
  ]);
  constructor(file: File) {
    super(file);
    this.alternatives.push(new LitString(file));
    this.alternatives.push(new IdentifierUse(file, this.tokenTypes));
  }
}
