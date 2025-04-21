import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { IdentifierNode } from "./identifier-node";

export class VarDefNode extends AbstractAlternatives {
  override errorLink: string = "#parse_var_or_let_def";

  constructor() {
    super();
    this.alternatives.push(new IdentifierNode());
    this.alternatives.push(new DeconstructedTuple(true));
    this.alternatives.push(new DeconstructedList(true));
  }
}
