import { DOT } from "../symbols";
import { AbstractAlternatives } from "./abstract-alternatives";
import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";

export class QualifierDot extends AbstractSequence {
    qualifier: AbstractAlternatives;

    constructor(qualAlts: AbstractAlternatives) {
        super();
        this.qualifier = qualAlts;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(this.qualifier);
            this.elements.push(new SymbolNode(DOT));
            super.parseText(text);
        }
    }
}