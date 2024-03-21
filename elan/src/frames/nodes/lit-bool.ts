import { AbstractAlternatives } from "./abstract-alternatives";
import { Symbol } from "./symbol";
import { Keyword } from "./keyword";

export class LitBool extends AbstractAlternatives {

    constructor() {
        super();
        this.placeholder = "true or false";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.alternatives.push(new Keyword("true"));
            this.alternatives.push(new Keyword("false"));
            super.parseText(text);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}

export class True extends Symbol {

}

export class False extends Symbol {
    
}