import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";
import { ParseStatus } from "../parse-status";
import { stat } from "fs";

export abstract class Alternatives extends AbstractParseNode {
    alternatives: ParseNode[] = [];

    bestMatch?: ParseNode;

    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            var cont = true;
            var i = 0;
            while (i < this.alternatives.length && cont) {
                var alt = this.alternatives[i];
                alt.parseText(text);
                if (alt.status === ParseStatus.valid && alt.remainingText.length === 0) {
                    this.bestMatch = alt;
                    cont = false;
                } else if (!this.bestMatch || alt.remainingText.length < this.bestMatch.remainingText.length ||
                    alt.remainingText.length === this.bestMatch.remainingText.length && alt.status > this.bestMatch.status) {
                        this.bestMatch = alt;
                }
                i++;
            };
            this.status = this.bestMatch!.status;
            this.matchedText = this.bestMatch!.matchedText;
            this.remainingText = this.bestMatch!.remainingText;
        } else {
            this.status = ParseStatus.notParsed;
            this.matchedText = "";
            this.remainingText = "";
        }
    }

    textAsHtml(): string {
        //Delegates to best match only
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        //Delegates to best match only
        return this.bestMatch ? this.bestMatch.textAsSource() : "";
    }
}