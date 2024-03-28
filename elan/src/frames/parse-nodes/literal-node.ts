import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Dictionary } from "./dictionary";
import { List } from "./list";
import { LitValue } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
    constructor(field : Field) {
        super(field);
        this.placeholder = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitValue(this.field));
        this.alternatives.push(new List(() => new LitValue(this.field), this.field));
        this.alternatives.push(new Dictionary(() => new LitValue(this.field), () => new LitValue(this.field), this.field));
        super.parseText(text);
    }
}