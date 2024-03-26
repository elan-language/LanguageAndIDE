import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { ExprNode } from "./expr-node";

export class IfExpr extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new KeywordNode("if"));
            this.elements.push(new ExprNode());
            this.elements.push(new KeywordNode("then"));
            this.elements.push(new ExprNode());
            this.elements.push(new KeywordNode("else"));
            this.elements.push(new ExprNode());
            super.parseText(text);
        }
    }
}