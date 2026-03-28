import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { InstanceProcRef } from "./instanceProcRef";
import { MethodNameUse } from "./method-name-use";
import { ThisProcRef } from "./thisProcRef";

export class ProcRefNode extends AbstractAlternatives {
  constructor(f: File) {
    super(f);
    this.alternatives.push(new MethodNameUse(f, new Set([TokenType.method_procedure])));
    this.alternatives.push(new ThisProcRef(f));
    this.alternatives.push(new InstanceProcRef(f));
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
