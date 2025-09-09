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
    const t = text.trim();
    if (t.length > 0) {
      if (`"'`.includes(t[0])) {
        this.alternatives.push(new LitString());
      } else if ("-0123456789".includes(t[0])) {
        this.alternatives.push(new LitInt());
        this.alternatives.push(new LitFloat());
      } else if (t[0] === `/`) {
        this.alternatives.push(new LitRegExp());
      } else {
        this.alternatives.push(new EnumVal());
      }
      super.parseText(text);
    }
  }
}
