import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { PropertyRef } from "./property-ref";

export class VariableOrProperty extends AbstractAlternatives {
  tokenTypes = new Set<TokenType>([
    TokenType.id_parameter_out,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor() {
    super();
    this.alternatives.push(new IdentifierNode(this.tokenTypes));
    this.alternatives.push(new PropertyRef());
  }
}
