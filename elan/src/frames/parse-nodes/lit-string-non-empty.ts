import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { RegExMatchNode } from "./regex-match-node";
import { DOUBLE_QUOTES } from "../symbols";
import { Regexes } from "../fields/regexes";
import { StringInterpolation } from "./string-interpolation";
import { Alternatives } from "./alternatives";
import { Multiple } from "./multiple";

export class LitStringNonEmpty extends AbstractSequence {
    segments: Multiple | undefined;

    constructor() {
        super();
        this.completionWhenEmpty = `"string"`;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            var field = () => new StringInterpolation();
            var plainText = () => new RegExMatchNode(Regexes.nonEmptyStringContent);
            var segment = () => new Alternatives([field, plainText]);
            this.segments = new Multiple(segment, 1);
            this.addElement(new SymbolNode(DOUBLE_QUOTES));
            this.addElement(this.segments);
            this.addElement(new SymbolNode(DOUBLE_QUOTES));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<string>"${this.segments!.renderAsHtml()}"</string>`;
    }
}