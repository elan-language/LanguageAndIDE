import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { IdentifierNode } from "./identifier-node";
import { PropertyRef } from "./property-ref";
import { File } from "../frame-interfaces/file";

export class AssignableNode extends AbstractAlternatives {
  tokenTypes = new Set<TokenType>([
    TokenType.id_parameter_out,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor(file: File) {
    super(file);
    this.alternatives.push(new IdentifierNode(file, this.tokenTypes));
    this.alternatives.push(new PropertyRef(file));
    this.alternatives.push(new DeconstructedTuple(file));
    this.alternatives.push(new DeconstructedList(file));
  }
}
