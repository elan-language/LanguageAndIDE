import { AbstractSequence } from "./abstract-sequence";
import { AnyTextExceptQuotes } from "./anyTextExceptQuotes";
import { FixedText } from "./fixed-text";

export class LitString extends AbstractSequence {
    constructor() {
        super();
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new FixedText(`"`));
            this.elements.push(new AnyTextExceptQuotes());
            this.elements.push(new FixedText(`"`));
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