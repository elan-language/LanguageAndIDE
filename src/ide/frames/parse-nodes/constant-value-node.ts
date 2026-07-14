import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Identifier } from "./identifier";
import { LitValueNode } from "./lit-value-node";

export class ConstantValueNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitValueNode(this.file));
    this.alternatives.push(new Identifier(this.file));
    super.parseText(text);
  }
}
