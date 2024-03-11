import { Regexes } from "../fields/regexes";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class BinOp extends AbstractParseNode {
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