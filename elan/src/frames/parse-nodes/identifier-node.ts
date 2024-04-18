
import { Regexes } from "../fields/regexes";
import { allKeywords } from "../keywords";
import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierNode extends AbstractParseNode {

    constructor() {
        super();
        this.completionWhenEmpty = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text.trimStart(), Regexes.identifier);
            var match = this.matchedText;
            //Check that it is not a keyword (except result)
            if (this.status === ParseStatus.valid && allKeywords.indexOf(match) > -1) {
                this.status = ParseStatus.invalid;
                this.matchedText = "";
                this.remainingText = text;
            }
        }
    }
}