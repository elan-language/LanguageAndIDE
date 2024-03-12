import { Alternatives } from "./abstract-alternatives";
import { LitBool } from "./lit-bool";
import { LitChar } from "./lit-char";
import { LitFloat } from "./lit-float";
import { LitInt } from "./lit-int";

export class Literal extends Alternatives {
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new LitInt());
        this.alternatives.push(new LitFloat());
        this.alternatives.push(new LitChar());
        this.alternatives.push(new LitBool());
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }
    
}