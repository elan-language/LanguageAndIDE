import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";
import { LitInt } from "./lit-int";

export class LitFloat extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = "float value";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.subNodes.push(new LitInt());
            this.subNodes.push(new FixedText("."));
            this.subNodes.push(new LitInt());
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