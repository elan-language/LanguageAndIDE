import { CLOSE_SQ_BRACKET, COLON, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";

export class DeconstructedList extends AbstractSequence {
    head: IdentifierNode | undefined;
    tail: IdentifierNode | undefined;

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new SymbolNode(OPEN_SQ_BRACKET));
            this.head =new IdentifierNode();
            this.elements.push(this.head);
            this.elements.push(new SymbolNode(COLON));
            this.tail = new IdentifierNode();
            this.elements.push(this.tail);
            this.elements.push(new SymbolNode(CLOSE_SQ_BRACKET));
            super.parseText(text);
        }
    }
}