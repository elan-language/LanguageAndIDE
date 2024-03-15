import { identifier } from "../fields/parse-functions";
import { Regexes } from "../fields/regexes";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class VariableNode extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "variable name";
    }

    parseText(text: string): void {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*[a-z]\w*/);
    }

    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }

}