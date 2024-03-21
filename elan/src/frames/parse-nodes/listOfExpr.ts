import { AbstractSequence } from "./abstract-sequence";
import { Symbol } from "./symbol";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";

export class ListOfExpr extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Symbol(`{`));
            this.elements.push(new CSV(() => new ExprNode(),0));
            this.elements.push(new Symbol(`}`));
            super.parseText(text);
        }
    }
    
}