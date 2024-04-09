import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { LiteralNode } from "./literal-node";
import { SymbolNode } from "./symbol-node";

export class LitTuple extends AbstractSequence {
    csv: CSV | undefined;

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new SymbolNode(OPEN_BRACKET));
            this.csv = new CSV(() => new LiteralNode(),2);
            this.elements.push(this.csv);
            this.elements.push(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
}