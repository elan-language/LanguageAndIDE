import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { CSV } from "./csv";
import { ParseNode } from "./parse-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";

export class List extends AbstractSequence  {
    elementConstructor: () => ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new SymbolNode(OPEN_SQ_BRACKET));
            this.elements.push(new CSV(this.elementConstructor, 0));
            this.elements.push(new SymbolNode(CLOSE_SQ_BRACKET));
            super.parseText(text);
        }
    }
}