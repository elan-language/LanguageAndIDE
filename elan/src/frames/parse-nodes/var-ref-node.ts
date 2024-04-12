

import { IdentifierNode } from "./identifier-node";
import { AbstractAlternatives } from "./abstract-alternatives";
import { VarRefCompound } from "./var-ref-compound";

export class VarRefNode extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "variable";
    }

    parseText(text: string): void {
        var simple = () => new IdentifierNode();
        this.alternatives.push(simple());
        this.alternatives.push(new VarRefCompound());
        super.parseText(text);
    }
}