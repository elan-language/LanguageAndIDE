import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";
import { Optional } from "./optional";
import { Literal } from "./literal";

export class LitList extends AbstractSequence {
    constructor() {
        super();
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.subNodes.push(new FixedText(`{`));
            this.subNodes.push(new Optional(new Literal()));
            this.subNodes.push(new FixedText(`}`));
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