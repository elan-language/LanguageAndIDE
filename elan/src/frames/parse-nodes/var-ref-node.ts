

import { IdentifierNode } from "./identifier-node";
import { AbstractAlternatives } from "./abstract-alternatives";
import { VarRefCompound } from "./var-ref-compound";

export class VarRefNode extends AbstractAlternatives {
    constructor() {
        super();
        this.completionWhenEmpty = "variable";
    }

    parseText(text: string): void {
        const simple = () => new IdentifierNode();
        this.alternatives.push(simple());
        this.alternatives.push(new VarRefCompound());
        super.parseText(text);
    }
}