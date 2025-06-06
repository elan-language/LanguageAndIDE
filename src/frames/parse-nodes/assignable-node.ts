import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { IdentifierNode } from "./identifier-node";
import { PropertyRef } from "./property-ref";

export class AssignableNode extends AbstractAlternatives {
  tokenTypes = new Set<TokenType>([
    TokenType.id_parameter_out,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor() {
    super();
    this.alternatives.push(new IdentifierNode(this.tokenTypes));
    this.alternatives.push(new PropertyRef());
    this.alternatives.push(new DeconstructedTuple());
    this.alternatives.push(new DeconstructedList());
  }
}
