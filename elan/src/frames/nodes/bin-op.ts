import { Regexes } from "../fields/regexes";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class BinOp extends AbstractParseNode {
    parseText(text: string): void {
    [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*\+|\-|\*|\// );
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }
}