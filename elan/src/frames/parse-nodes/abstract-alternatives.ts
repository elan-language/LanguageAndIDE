import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";
import { ParseStatus } from "../status-enums";

export abstract class AbstractAlternatives extends AbstractParseNode {
    alternatives: ParseNode[] = [];
    bestMatch?: ParseNode;

    constructor() {
        super();
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (this.remainingText.length > 0) {
            let cont = true;
            let i = 0;
            while (i < this.alternatives.length && cont) {
                const alt = this.alternatives[i];
                alt.parseText(text);
                if (alt.status === ParseStatus.valid && alt.remainingText.length === 0) {
                    this.bestMatch = alt;
                    cont = false;
                } else if (!this.bestMatch
                    || alt.remainingText.length < this.bestMatch.remainingText.length
                    || alt.remainingText.length === this.bestMatch.remainingText.length && alt.status > this.bestMatch.status) {
                    this.bestMatch = alt;
                }
                i++;
            };
            if (this.bestMatch!.status > ParseStatus.invalid) {
                this.status = this.bestMatch!.status;
                this.matchedText = this.bestMatch!.matchedText;
                this.remainingText = this.bestMatch!.remainingText;
            } else {
                this.bestMatch = undefined;
                this.status = ParseStatus.invalid;
            }
        }
    }

    renderAsHtml(): string {
        return this.bestMatch ? this.bestMatch.renderAsHtml() : "";
    }
    renderAsSource(): string {
        return this.bestMatch ? this.bestMatch.renderAsSource() : "";
    }
    compile(): string {
        return this.bestMatch ? this.bestMatch.compile() : "";
    }
    getCompletionAsHtml(): string {
        return this.    bestMatch ? this.bestMatch.getCompletionAsHtml() : super.getCompletionAsHtml();
    }

}