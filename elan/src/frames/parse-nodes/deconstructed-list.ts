import { IntType } from "../../symbols/int-type";
import { Field } from "../interfaces/field";
import { CLOSE_SQ_BRACKET, COLON, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";

export class DeconstructedList extends AbstractSequence {

    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(OPEN_SQ_BRACKET));
            this.elements.push(new IdentifierNode());
            this.elements.push(new SymbolNode(COLON));
            this.elements.push(new IdentifierNode());
            this.elements.push(new SymbolNode(CLOSE_SQ_BRACKET));
            super.parseText(text);
        }
    }
}