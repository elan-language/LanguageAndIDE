import { CharType } from "../../symbols/char-type";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitChar extends AbstractParseNode {
    constructor(field : Field) {
        super(field);
        this.placeholder = "char value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*'.'/);
        }
    }

    get symbolType() {
        return CharType.Instance;
    }
}