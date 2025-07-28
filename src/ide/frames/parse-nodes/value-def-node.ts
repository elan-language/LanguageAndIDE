import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { IdentifierNode } from "./identifier-node";

export class ValueDefNode extends AbstractAlternatives {
  constructor() {
    super();
    this.alternatives.push(new IdentifierNode());
    this.alternatives.push(new DeconstructedTuple(true));
    this.alternatives.push(new DeconstructedList(true));
  }
}
