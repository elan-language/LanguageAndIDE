import { CharType } from "../../symbols/char-type";
import { Regexes } from "../fields/regexes";
import { Field } from "../interfaces/field";
import { SINGLE_QUOTE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { RegExMatchNode } from "./regex-match-node";
import { SymbolNode } from "./symbol-node";

export class LitChar extends AbstractSequence {
    constructor(field : Field) {
        super(field);
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(SINGLE_QUOTE, this.field));
            this.elements.push(new RegExMatchNode(Regexes.charValue, this.field));
            this.elements.push(new SymbolNode(SINGLE_QUOTE, this.field));
            super.parseText(text);
        }
    }

    get symbolType() {
        return CharType.Instance;
    }

    renderAsHtml(): string {
        return `<string>${this.matchedText}</string>`;
    }

}