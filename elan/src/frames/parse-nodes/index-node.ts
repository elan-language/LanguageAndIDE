import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { RangeNode } from "./range-node";
import { DoubleIndexNode } from "./double-index-node";

export class IndexNode extends AbstractSequence {
    contents: Alternatives | undefined;

    constructor() {
        super();
        this.completionWhenEmpty = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        const expr = () => new ExprNode();
        const doubleIndex = () => new DoubleIndexNode();
        const range = () => new RangeNode();
        this.contents = new Alternatives([expr, doubleIndex, range]);
        if (text.length > 0) {
            this.addElement(new SymbolNode(OPEN_SQ_BRACKET));
            this.addElement(this.contents);
            this.addElement(new SymbolNode(CLOSE_SQ_BRACKET));
            super.parseText(text);
        }
    }
}