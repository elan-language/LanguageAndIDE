import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { escapeAngleBrackets } from "../helpers";
import { rawSymbolToType } from "../../symbols/symbolHelpers";


export class SymbolNode extends AbstractParseNode {
    fixedText: string;
    isSymbol = true;

    constructor(fixedText: string) {
        super();
        this.fixedText = fixedText;
        this.placeholder = fixedText;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var target = this.fixedText;
            var trimmed = text.trimStart();
            if (trimmed.startsWith(target)) {
                var n = this.numLeadingSpaces(text) + this.fixedText.length;
                this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
            } else if (target.startsWith(trimmed)) {
                this.set(ParseStatus.incomplete, text, "");
            } else {
                this.set(ParseStatus.invalid, "", text);
            }
        }
    }

    renderAsHtml(): string {
        return escapeAngleBrackets(this.renderAsSource());
    }

    override renderAsObjectCode(): string {
        switch (this.fixedText) {
            case "^": return "**";
            default:
                return this.fixedText;
        }
    } 

    get symbolType() {
        return rawSymbolToType(this.fixedText);
    }
}
