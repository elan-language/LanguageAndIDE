import { escapeAngleBrackets } from "../helpers";
import { CodeStatus } from "../code-status";
import { FixedTextNode } from "./fixed-text-node";

export class SymbolNode extends FixedTextNode {
    constructor(symbol: string) {
        super(symbol);
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            var target = this.fixedText;
            if (text.startsWith(target)) {
                var n = this.numLeadingSpaces(text) + this.fixedText.length;
                this.set(CodeStatus.valid, text.substring(0, n), text.substring(n));
            } else if (target.startsWith(text)) {
                this.set(CodeStatus.incomplete, text, "");
            } else {
                this.set(CodeStatus.invalid, "", text, super.getErrorMessage());
            }
        }
    }

    renderAsHtml(): string {
        return escapeAngleBrackets(this.renderAsSource());
    }
}
