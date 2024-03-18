import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";

// Punctuation is rendered with no leading space
export class Punctuation extends AbstractParseNode {
    fixedText: string;
    renderWithLeadingSpace = false;

    constructor(fixedText: string) {
        super();
        this.fixedText = fixedText;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var target = this.fixedText;
            var trimmed = text.trimStart();
            if (trimmed.startsWith(target)) {
                var n = this.numLeadingSpaces(text)+ this.fixedText.length;
                this.set(ParseStatus.valid, text.substring(0, n) , text.substring(n));
            } else if (target.startsWith(trimmed)) {
                this.set(ParseStatus.incomplete, text, "");
            } else {
                this.set(ParseStatus.invalid, "",text);
            }
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }

    renderAsSource(): string {
        return this.matchedText;
    }
}
