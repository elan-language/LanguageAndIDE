import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { IdentifierNode } from "./identifier-node";

export class VarDefNode extends AbstractAlternatives {
  constructor() {
    super();
    this.alternatives.push(new IdentifierNode());
    this.alternatives.push(new DeconstructedTuple());
    this.alternatives.push(new DeconstructedList());
  }
}