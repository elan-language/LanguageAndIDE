import { ParseNode } from "../frame-interfaces/parse-node";
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { OptionalNode } from "./optional-node";
import { File } from "../frame-interfaces/file";

export class CSVelement extends AbstractSequence {
  node: ParseNode;

  constructor(file: File, node: ParseNode, mandatoryComma: boolean) {
    super(file);
    this.node = node;
    this.addElement(node);
    if (mandatoryComma) {
      this.addElement(new OptionalNode(this.file, new CommaNode(this.file)));
    } else {
      this.addElement(new CommaNode(this.file));
    }
  }
}
