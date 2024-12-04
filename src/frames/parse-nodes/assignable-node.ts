import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { VariableOrProperty } from "./variable-or-property";

export class AssignableNode extends AbstractAlternatives {
  constructor() {
    super();
    this.alternatives.push(new VariableOrProperty());
    this.alternatives.push(new DeconstructedTuple());
    this.alternatives.push(new DeconstructedList());
  }
}
