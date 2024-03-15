import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";

export class BracketedExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new FixedText("("));
            this.elements.push(new ExprNode());
            this.elements.push(new FixedText(")"));
            super.parseText(text);
        }
    }
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }

}