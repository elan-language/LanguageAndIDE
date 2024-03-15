import { Alternatives } from "./abstract-alternatives";
import { FixedText } from "./fixed-text";

export class LitBool extends Alternatives {

    constructor() {
        super();
        this.placeholder = "true or false";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.alternatives.push(new FixedText("true"));
            this.alternatives.push(new FixedText("false"));
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

export class True extends FixedText {

}

export class False extends FixedText {
    
}