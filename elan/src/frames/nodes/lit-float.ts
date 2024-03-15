import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";
import { LitInt } from "./lit-int";

export class LitFloat extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = "float value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.subNodes.push(new LitInt());
            this.subNodes.push(new FixedText("."));
            this.subNodes.push(new LitInt());
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