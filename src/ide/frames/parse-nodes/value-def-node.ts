import { AbstractAlternatives } from "./abstract-alternatives";
import { DeconstructedList } from "./deconstructed-list";
import { DeconstructedTuple } from "./deconstructed-tuple";
import { IdentifierNode } from "./identifier-node";
import { File } from "../frame-interfaces/file";

export class ValueDefNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.alternatives.push(new IdentifierNode(file));
    this.alternatives.push(new DeconstructedTuple(file, true));
    this.alternatives.push(new DeconstructedList(file, true));
  }
}
