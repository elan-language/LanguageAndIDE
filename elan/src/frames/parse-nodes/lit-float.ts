import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { LitInt } from "./lit-int";
import { RegExMatchNode } from "./regex-match-node";
import { OptionalNode } from "./optional-node";
import { Sequence } from "./sequence";
import { DOT } from "../symbols";
import { Regexes } from "../fields/regexes";

export class LitFloat extends AbstractSequence {

    constructor() {
        super();
        this.completionWhenEmpty = "float value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            this.addElement(new LitInt());
            this.addElement(new SymbolNode(DOT));
            this.addElement(new RegExMatchNode(Regexes.literalInt));
            var exponent = new OptionalNode(new Sequence([
                () => new RegExMatchNode(/e/),
                () => new RegExMatchNode(Regexes.negatableLitInt)
                ]));
            this.addElement(exponent);
            super.parseText(text);
        }
    }
    renderAsObjectCode(): string { return this.matchedText.toUpperCase(); } //For the exponent e -> E
}