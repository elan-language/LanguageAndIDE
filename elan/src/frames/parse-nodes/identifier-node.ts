import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { Regexes } from "../fields/regexes";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { allKeywords } from "../keywords";
import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierNode extends AbstractParseNode implements IHasSymbolType {

    constructor(field : Field) {
        super(field);
        this.placeholder = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, Regexes.identifier);
            var match = this.matchedText;
            //Check that it is not a keyword (except result)
            if (this.status === ParseStatus.valid && allKeywords.indexOf(match) > -1) {
                this.status = ParseStatus.invalid;
                this.matchedText = "";
                this.remainingText = text;
            }
        }
    }

    get symbolType() {
        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.matchedText.trim(), holder as Frame).symbolType;
    }
}