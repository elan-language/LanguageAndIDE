import { isKeyObject } from "util/types";
import { ParseStatus } from "../parse-status";
import { FixedTextNode } from "./fixed-text-node";
import { andKeyword, divKeyword, isKeyword, modKeyword, notKeyword, orKeyword, xorKeyword } from "../keywords";

export class KeywordNode extends FixedTextNode {
    constructor(keyword: string) {
        super(keyword);
        this.placeholder = keyword+" ";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var target = this.fixedText;
            var trimmed = text.trimStart();
            var lcLetters = trimmed.match(/^[a-z]*/);
            if (lcLetters && lcLetters.length === 1) {
                if (lcLetters[0] === target) {
                    var n = this.numLeadingSpaces(text) + this.fixedText.length;
                    this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
                } else if (target.startsWith(trimmed)) {
                    this.set(ParseStatus.incomplete, text, "");
                } else {
                    this.set(ParseStatus.invalid, "", text);
                }
            }
        }
    }

    renderAsHtml(): string {
        return `<keyword>${this.renderAsSource()}</keyword>`;
    }
    renderAsSource(): string {
        return this.matchedText.trim() + " ";
    }
    renderAsObjectCode() : string {
        switch (this.fixedText) {
            case isKeyword: return "===";
            case `${isKeyword} ${notKeyword}`: return "!==";
            case notKeyword: return "!";
            case andKeyword: return "&&";
            case orKeyword: return "||";
            case xorKeyword: return "^";
            case divKeyword: return "/";
            case modKeyword: return "%";
            default:
                return this.matchedText;
        }
    }
}
