import { AbstractSequence } from "./abstract-sequence";
import { AnyTextExceptQuotes } from "./anyTextExceptQuotes";
import { Punctuation } from "./punctuation";

export class LitString extends AbstractSequence {
    constructor() {
        super();
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Punctuation(`"`));
            this.elements.push(new AnyTextExceptQuotes());
            this.elements.push(new Punctuation(`"`));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}