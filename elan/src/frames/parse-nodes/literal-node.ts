import { Field } from "../interfaces/field";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Dictionary } from "./dictionary";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
    constructor() {
        super();
        this.completionWhenEmpty = "";
    }

    parseText(text: string): void {
        this.alternatives.push(new LitValueNode());
        this.alternatives.push(new ListNode(() => new LitValueNode()));
        this.alternatives.push(new Dictionary(() => new LitValueNode(), () => new LitValueNode()));
        super.parseText(text);
    }
}