import { identifier } from "../fields/parse-functions";
import { Regexes } from "../fields/regexes";
import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class VariableNode extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "variable name";
    }

    parseText(text: string): void {
        text = text.trimStart();
        [this.status, this.matchedText, this.remainingText] = matchRegEx(text, Regexes.identifier );
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }

}