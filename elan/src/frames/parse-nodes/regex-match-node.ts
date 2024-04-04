import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class RegExMatchNode extends AbstractParseNode {
    regx: RegExp;

    constructor(regx: RegExp) {
        super();
        this.regx = regx;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.regx);
        }
    }
}