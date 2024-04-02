import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { LitInt } from "./lit-int";
import { RegExMatchNode } from "./regex-match-node";
import { Field } from "../interfaces/field";
import { FloatType } from "../../symbols/float-type";
import { OptionalNode } from "./optional-node";
import { Sequence } from "./sequence";
import { DOT } from "../symbols";
import { Regexes } from "../fields/regexes";

export class LitFloat extends AbstractSequence {

    constructor(field : Field) {
        super(field);
        this.placeholder = "float value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.elements.push(new LitInt(this.field));
            this.elements.push(new SymbolNode(DOT, this.field));
            this.elements.push(new RegExMatchNode(Regexes.literalInt, this.field));
            var exponent = new OptionalNode(() => new Sequence([
                () => new RegExMatchNode(/e/, this.field),
                () => new RegExMatchNode(Regexes.negatableLitInt, this.field)
                ], this.field), this.field);
            this.elements.push(exponent);
            super.parseText(text);
        }
    }

    get symbolType() {
        return FloatType.Instance;
    }
    renderAsObjectCode(): string { return this.matchedText.toUpperCase(); } //For the exponent e -> E
}