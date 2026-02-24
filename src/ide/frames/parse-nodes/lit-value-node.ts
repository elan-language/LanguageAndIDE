import { File } from "../frame-interfaces/file";
import { AbstractAlternatives } from "./abstract-alternatives";
import { EnumVal } from "./enum-val";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";
import { LitRegExp } from "./lit-regExp";
import { LitString } from "./lit-string";

export class LitValueNode extends AbstractAlternatives {
  constructor(file: File) {
    super(file);
    this.completionWhenEmpty = this.getCompletionFromLangOr("");
  }

  parseText(text: string): void {
    this.alternatives.push(new LitInt(this.file));
    this.alternatives.push(new LitFloat(this.file));
    this.alternatives.push(new LitString(this.file));
    this.alternatives.push(new EnumVal(this.file));
    this.alternatives.push(new LitRegExp(this.file));
    super.parseText(text);
  }
}
