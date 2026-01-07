import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { InstanceProcRef } from "./instanceProcRef";
import { MethodNameNode } from "./method-name-node";
import { File } from "../frame-interfaces/file";

export class ProcRefNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.alternatives.push(new InstanceProcRef(this.file));
    this.alternatives.push(new MethodNameNode(file, new Set([TokenType.method_procedure])));
  }

  getProcName(): string {
    let procName = "";
    if (this.bestMatch instanceof InstanceProcRef) {
      procName = this.bestMatch!.procName!.matchedText;
    } else if (this.bestMatch instanceof MethodNameNode) {
      procName = this.matchedText;
    }
    return procName;
  }
}
