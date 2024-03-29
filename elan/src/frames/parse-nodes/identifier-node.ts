import { IHasSymbolType } from "../../symbols/has-symbol-type";
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
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*[a-z]\w*/);
            var match = this.matchedText;
            //Check that it is not a keyword (except result)
            if (this.status === ParseStatus.valid && allKeywords.indexOf(match) > -1) {
                this.status = ParseStatus.invalid;
                this.matchedText = "";
                this.remainingText = this.remainingText;
            }
        }
    }

    get symbolType() {
        var holder = this.field.getHolder();
        return holder.resolveSymbol(this.matchedText, holder as Frame).symbolType;
    }
}