import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class TupleNode extends AbstractSequence {
    csv : CSV | undefined;

    parseText(text: string): void {
        if (text.length > 0) {
            this.addElement(new SymbolNode(OPEN_BRACKET));
            this.csv = new CSV(() => new ExprNode(),2);
            this.addElement(this.csv);
            this.addElement(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
}