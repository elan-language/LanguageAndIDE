import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { InstanceProcRef } from "./instanceProcRef";
import { MethodNameUse } from "./method-name-use";

export class ProcRefNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.alternatives.push(new InstanceProcRef(this.file));
    this.alternatives.push(new MethodNameUse(file, new Set([TokenType.method_procedure])));
  }

  getProcName(): string {
    let procName = "";
    if (this.bestMatch instanceof InstanceProcRef) {
      procName = this.bestMatch!.procName!.matchedText;
    } else if (this.bestMatch instanceof MethodNameUse) {
      procName = this.matchedText;
    }
    return procName;
  }
}
