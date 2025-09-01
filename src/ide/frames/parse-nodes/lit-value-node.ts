import { AbstractAlternatives } from "./abstract-alternatives";
import { EnumVal } from "./enum-val";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";
import { LitRegExp } from "./lit-regExp";
import { LitString } from "./lit-string";

export class LitValueNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitInt());
    this.alternatives.push(new LitFloat());
    this.alternatives.push(new LitString());
    this.alternatives.push(new EnumVal());
    this.alternatives.push(new LitRegExp());
    super.parseText(text);
  }
}
