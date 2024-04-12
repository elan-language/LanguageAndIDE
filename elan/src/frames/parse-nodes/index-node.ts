import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { RangeNode } from "./range-node";

export class IndexNode extends AbstractSequence {
    contents: Alternatives | undefined;

    constructor() {
        super();
        this.placeholder = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        var expr = () => new ExprNode();
        var range = () => new RangeNode()
        this.contents = new Alternatives([expr, range]);
        if (text.length > 0) {
          this.elements.push(new SymbolNode(OPEN_SQ_BRACKET));
          this.elements.push(this.contents);
          this.elements.push(new SymbolNode(CLOSE_SQ_BRACKET));
          super.parseText(text);
        }
    }
}