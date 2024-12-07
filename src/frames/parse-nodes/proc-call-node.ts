import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { ProcRefNode } from "./proc-ref-node";
import { PunctuationNode } from "./punctuation-node";

export class ProcCallNode extends AbstractSequence {
  procRef: ProcRefNode;
  args: ArgListNode;
  constructor() {
    super();
    this.procRef = new ProcRefNode();
    this.addElement(this.procRef);
    this.addElement(new PunctuationNode(OPEN_BRACKET));
    this.args = new ArgListNode(() => this.procRef.getProcName()); 
    this.addElement(this.args);
    this.addElement(new PunctuationNode(CLOSE_BRACKET));
  }
}
