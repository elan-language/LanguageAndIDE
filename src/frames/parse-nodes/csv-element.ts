import { ParseNode } from "../frame-interfaces/parse-node";
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { OptionalNode } from "./optional-node";

export class CSVelement extends AbstractSequence {
  node: ParseNode;

  constructor(node: ParseNode, mandatoryComma: boolean) {
    super();
    this.node = node;
    this.addElement(node);
    if (mandatoryComma) {
      this.addElement(new OptionalNode(new CommaNode()));
    } else {
      this.addElement(new CommaNode());
    }
  }
}
