import { TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { IdentifierNode } from "./identifier-node";
import { InstanceProcRef } from "./instanceProcRef";
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
    this.args = new ArgListNode(() => ""); //TODO
    this.addElement(this.args);
    this.addElement(new PunctuationNode(CLOSE_BRACKET));
  }

  //ProcRefNode - or possibly broken down here
  //Open brackets
  //ArgListNode
  //Close brackets
}
