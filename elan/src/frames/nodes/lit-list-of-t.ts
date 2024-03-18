import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";
import { CSV } from "./csv";
import { ParseNode } from "./parse-node";

export class LitListOfT extends AbstractSequence {
    elementConstructor: () => ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new FixedText(`{`));
            this.elements.push(new CSV(this.elementConstructor,0));
            this.elements.push(new FixedText(`}`));
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