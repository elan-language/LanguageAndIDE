import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Dictionary } from "./dictionary";
import { List } from "./list";
import { LitValueNode } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitValueNode());
        this.alternatives.push(new List(() => new LitValueNode()));
        this.alternatives.push(new Dictionary(() => new LitValueNode(), () => new LitValueNode()));
        super.parseText(text);
    }
}