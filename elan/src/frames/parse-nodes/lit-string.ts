import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { RegExMatchNode } from "./regex-match-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { StringType } from "../../symbols/string-type";
import { DOUBLE_QUOTES } from "../symbols";
import { Regexes } from "../fields/regexes";

export class LitString extends AbstractSequence {
    constructor() {
        super();
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(DOUBLE_QUOTES));
            this.elements.push(new RegExMatchNode(Regexes.stringContent));
            this.elements.push(new SymbolNode(DOUBLE_QUOTES));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<string>${this.renderAsSource()}</string>`;
    }
}