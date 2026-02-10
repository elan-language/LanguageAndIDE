import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { InstanceNode } from "./instanceNode";
import { PropertyRef } from "./property-ref";

export class AssignableNode extends AbstractAlternatives {
  tokenTypes = new Set<TokenType>([TokenType.id_property, TokenType.id_variable]);

  constructor(file: File) {
    super(file);
    this.alternatives.push(new InstanceNode(file));
    this.alternatives.push(new PropertyRef(file));
  }
}
