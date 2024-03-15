import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";

export class BracketedExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.subNodes.push(new FixedText("("));
            this.subNodes.push(new ExprNode());
            this.subNodes.push(new FixedText(")"));
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