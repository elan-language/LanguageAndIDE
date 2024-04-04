import { IntType } from "../../symbols/int-type";
import { Regexes } from "../fields/regexes";
import { Field } from "../interfaces/field";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitInt extends AbstractParseNode {


    constructor() {
        super();
        this.placeholder = "integer value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, Regexes.literalInt);
        }
    }
}