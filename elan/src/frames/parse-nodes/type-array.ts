
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeArray extends AbstractSequence {
    simpleType: TypeSimpleNode | undefined;

    constructor() {
        super();
        this.completionWhenEmpty = "Type";
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            this.simpleType = new TypeSimpleNode();
            this.addElement(this.simpleType);
            this.addElement(new SymbolNode(OPEN_SQ_BRACKET));
            this.addElement(new SymbolNode(CLOSE_SQ_BRACKET));
            super.parseText(text);
        }
    }
}