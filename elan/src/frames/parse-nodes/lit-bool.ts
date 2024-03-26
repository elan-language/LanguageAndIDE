import { AbstractAlternatives } from "./abstract-alternatives";
import { KeywordNode } from "./keyword-node";

export class LitBool extends AbstractAlternatives {

    constructor() {
        super();
        this.placeholder = "true or false";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.alternatives.push(new KeywordNode("true"));
            this.alternatives.push(new KeywordNode("false"));
            super.parseText(text);
        }
    }
}