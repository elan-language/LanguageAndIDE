import { SymbolNode } from "./symbol-node";
import { DOUBLE_QUOTES } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";

export class LitStringEmpty extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.length > 0) { 
            this.elements.push(new SymbolNode(DOUBLE_QUOTES));
            this.elements.push(new SymbolNode(DOUBLE_QUOTES));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<string>${this.renderAsSource()}</string>`;
    }
}