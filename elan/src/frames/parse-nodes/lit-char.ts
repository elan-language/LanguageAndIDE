import { CharType } from "../../symbols/char-type";
import { Regexes } from "../fields/regexes";
import { Field } from "../interfaces/field";
import { SINGLE_QUOTE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { RegExMatchNode } from "./regex-match-node";
import { SymbolNode } from "./symbol-node";

export class LitChar extends AbstractSequence {
    constructor() {
        super();
        this.placeholder = "";
    }
    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new SymbolNode(SINGLE_QUOTE));
            this.elements.push(new RegExMatchNode(Regexes.charValue));
            this.elements.push(new SymbolNode(SINGLE_QUOTE));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<string>${this.matchedText}</string>`;
    }
}