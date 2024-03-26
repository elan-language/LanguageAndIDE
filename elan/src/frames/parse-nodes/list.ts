import { AbstractSequence } from "./abstract-sequence";
import { Symbol } from "./symbol";
import { CSV } from "./csv";
import { ParseNode } from "./parse-node";

export class List extends AbstractSequence {
    elementConstructor: () => ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Symbol(`[`));
            this.elements.push(new CSV(this.elementConstructor, 0));
            this.elements.push(new Symbol(`]`));
            super.parseText(text);
        }
    }
}