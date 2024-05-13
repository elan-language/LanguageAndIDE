import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { EnumVal } from "./enum-val";
import { LitBoolean } from "./lit-boolean";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";
import { LitStringEmpty } from "./lit-string-empty";
import { LitStringNonEmpty } from "./lit-string-non-empty";
import { LitTuple } from "./lit-tuple";

export class LitValueNode extends AbstractAlternatives {
    constructor() {
        super();
        this.completionWhenEmpty = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitInt());
        this.alternatives.push(new LitFloat());
        this.alternatives.push(new LitBoolean());
        this.alternatives.push(new LitStringEmpty());
        this.alternatives.push(new LitStringNonEmpty());
        this.alternatives.push(new EnumVal());
        this.alternatives.push(new LitTuple());
        super.parseText(text);
    }
}