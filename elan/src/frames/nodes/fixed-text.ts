import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";

export class FixedText extends AbstractParseNode {
    fixedText: string;

    constructor(fixedText: string) {
        super();
        this.fixedText = fixedText;
    }

    parseText(text: string): void {
        var trimmed = text.trimStart();
        var target = this.fixedText;
        if (text.length > 0) {
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

    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
}
