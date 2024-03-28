import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Dictionary } from "./dictionary";
import { List } from "./list";
import { LitValueNode } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
    constructor(field : Field) {
        super(field);
        this.placeholder = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitValueNode(this.field));
        this.alternatives.push(new List(() => new LitValueNode(this.field), this.field));
        this.alternatives.push(new Dictionary(() => new LitValueNode(this.field), () => new LitValueNode(this.field), this.field));
        super.parseText(text);
    }
}