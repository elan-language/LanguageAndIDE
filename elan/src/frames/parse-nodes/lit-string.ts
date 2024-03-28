import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { RegExMatchNode } from "./regex-match-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { StringType } from "../../symbols/string-type";

export class LitString extends AbstractSequence {
    constructor(field : Field) {
        super(field);
        this.placeholder = `"string"`;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(`"`, this.field));
            this.elements.push(new RegExMatchNode(/^[^"]*/, this.field));
            this.elements.push(new SymbolNode(`"`, this.field));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<string>${this.renderAsSource()}</string>`;
    }

    get symbolType() {
        return StringType.Instance;
    }
}