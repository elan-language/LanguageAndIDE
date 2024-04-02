import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { EnumVal } from "./enum-val";
import { LitBool } from "./lit-bool";
import { LitChar } from "./lit-char";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";
import { LitString } from "./lit-string";
import { LitTuple } from "./lit-tuple";

export class LitValueNode extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitInt());
        this.alternatives.push(new LitFloat());
        this.alternatives.push(new LitChar());
        this.alternatives.push(new LitBool());
        this.alternatives.push(new LitString());
        this.alternatives.push(new EnumVal());
        this.alternatives.push(new LitTuple());
        super.parseText(text);
    }
}