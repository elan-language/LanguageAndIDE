import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { EnumVal } from "./enum-val";
import { LitBool } from "./lit-bool";
import { LitChar } from "./lit-char";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";
import { LitString } from "./lit-string";
import { LitTuple } from "./lit-tuple";

export class LitValue extends AbstractAlternatives {
    constructor(field : Field) {
        super(field);
        this.placeholder = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitInt(this.field));
        this.alternatives.push(new LitFloat(this.field));
        this.alternatives.push(new LitChar(this.field));
        this.alternatives.push(new LitBool(this.field));
        this.alternatives.push(new LitString(this.field));
        this.alternatives.push(new EnumVal(this.field));
        this.alternatives.push(new LitTuple(this.field));
        super.parseText(text);
    }
}