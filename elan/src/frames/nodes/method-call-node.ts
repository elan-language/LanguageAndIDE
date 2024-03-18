import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { FixedText } from "./fixed-text";
import { IdentifierNode } from "./identifier-node";

export class MethodCallNode extends AbstractSequence {
    constructor() {
        super();
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.elements.push(new IdentifierNode());
            this.elements.push(new FixedText("("));
            this.elements.push(new CSV(() => new ExprNode(),0)); //arg list
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