import { AbstractSequence } from "./abstract-sequence";
import { UnaryOp } from "./unary-op";
import { Term } from "./term";

export class UnaryTerm extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "op";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new UnaryOp());
            this.elements.push(new Term());
            return super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}