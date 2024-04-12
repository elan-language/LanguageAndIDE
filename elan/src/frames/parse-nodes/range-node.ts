import { AbstractSequence } from "./abstract-sequence";
import { OptionalNode } from "./optional-node";
import { DOUBLE_DOT } from "../symbols";
import { SymbolNode } from "./symbol-node";
import { ExprNode } from "./expr-node";

export class RangeNode extends AbstractSequence {
    fromIndex: OptionalNode | undefined;
    toIndex: OptionalNode | undefined;
    
    parseText(text: string): void {
        if (text.length > 0) {
            this.fromIndex = new OptionalNode(() => new ExprNode());
            this.toIndex = new OptionalNode(() => new ExprNode());

            this.elements.push(this.fromIndex);
            this.elements.push(new SymbolNode(DOUBLE_DOT));
            this.elements.push(this.toIndex);
            return super.parseText(text);
        }
    }
}