import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { Symbol } from "./symbol";
import { RegExMatchNode } from "./regex-match-node";

export class EnumVal extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new RegExMatchNode(/^\s*[A-Z]\w*/));
        this.elements.push(new Symbol(".")); 
        this.elements.push(new IdentifierNode()); 
        super.parseText(text);
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}