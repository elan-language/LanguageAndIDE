import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { InstanceProcRef } from "./instanceProcRef";

export class ProcRefNode extends AbstractAlternatives {
  constructor() {
    super();
    this.alternatives.push(new InstanceProcRef());
    this.alternatives.push(new IdentifierNode(new Set([TokenType.method_procedure])));
  }

  //Temporary solution - pending (possible) refactoring of ProcRefNode into a Sequence
  getProcName(): string {
    let procName = "";
    if (this.bestMatch instanceof InstanceProcRef) {
      procName = this.bestMatch!.procName!.matchedText;
    } else if (this.bestMatch instanceof IdentifierNode) {
      procName = this.matchedText;
    }
    return procName;
  }
}
