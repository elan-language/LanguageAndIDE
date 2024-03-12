import { Expression } from "./expression";
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
            this.subNodes.push(new Expression());
            this.subNodes.push(new FixedText(")"));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }

}