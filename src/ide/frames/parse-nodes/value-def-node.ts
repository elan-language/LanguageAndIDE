import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierUse } from "./identifier-use";

export class ValueDefNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.alternatives.push(new IdentifierUse(file));
  }
}
