import { AbstractSequence } from "./abstract-sequence";
import { Symbol } from "./symbol";
import { RegExMatchNode } from "./regex-match-node";

export class LitString extends AbstractSequence {
    constructor() {
        super();
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Symbol(`"`));
            this.elements.push(new RegExMatchNode(/^[^"]*/));
            this.elements.push(new Symbol(`"`));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}