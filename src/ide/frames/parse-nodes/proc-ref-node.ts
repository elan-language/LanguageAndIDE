import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { DOT } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { InstanceProcRef } from "./instanceProcRef";
import { MethodNameUse } from "./method-name-use";
import { PunctuationNode } from "./punctuation-node";
import { Sequence } from "./sequence";
import { ThisInstance } from "./this-instance";

export class ProcRefNode extends AbstractAlternatives {
  constructor(f: File) {
    super(f);
    const thisProcRef = new Sequence(f, [
      () => new ThisInstance(f),
      () => new PunctuationNode(f, DOT),
      () => new MethodNameUse(f, new Set([TokenType.method_procedure])),
    ]);
    this.alternatives.push(new MethodNameUse(f, new Set([TokenType.method_procedure])));
    this.alternatives.push(thisProcRef);
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
