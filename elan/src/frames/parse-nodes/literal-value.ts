import { AbstractAlternatives } from "./abstract-alternatives";
import { LitBool } from "./lit-bool";
import { LitChar } from "./lit-char";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";
import { LitString } from "./lit-string";

export class LiteralValue extends AbstractAlternatives {
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
        super.parseText(text);
    }
}