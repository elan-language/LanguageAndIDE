import { Regexes } from "../fields/regexes";
import { SINGLE_QUOTE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { RegExMatchNode } from "./regex-match-node";
import { SymbolNode } from "./symbol-node";

export class LitChar extends AbstractSequence {

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new SymbolNode(SINGLE_QUOTE));
            this.elements.push(new RegExMatchNode(Regexes.charValue));
            this.elements.push(new SymbolNode(SINGLE_QUOTE));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<string>${this.renderAsSource}</string>`;
    }

    renderAsSource(): string {
        return `'${this.elements[1].matchedText}'`; //No .Trim() because might be a single space
    }
}