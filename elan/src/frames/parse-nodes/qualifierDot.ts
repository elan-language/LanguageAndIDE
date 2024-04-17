import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";
import { SymbolNode } from "./symbol-node";

export class Qualifier extends AbstractSequence {
    qualifier: ParseNode;

    constructor(qual: ParseNode) {
        super();
        this.qualifier = qual;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.addElement(this.qualifier);
            this.addElement(new SymbolNode(DOT));
            super.parseText(text);
        }
    }
}