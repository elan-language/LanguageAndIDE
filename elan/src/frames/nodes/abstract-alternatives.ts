import { start } from "repl";
import { AbstractParseNode } from "./abstract-parse-node";
import { BinaryOperation } from "./binary-operation";
import { ParseNode } from "./parse-node";

export abstract class Alternatives extends AbstractParseNode {
    alternatives: ParseNode[] = [];
    bestMatch?: ParseNode;

    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        var remaining = text.trimStart();
        if (text.length > 0) {
            this.alternatives.forEach(alt => {
                alt.parseText(remaining);
                if (!this.bestMatch || alt.remainingText.length < this.bestMatch.remainingText.length ||
                    alt.remainingText.length === this.bestMatch.remainingText.length && alt.status > this.bestMatch.status) {
                        this.bestMatch = alt;
                 }
            });
        }
    }
    renderAsHtml(): string {
        //Delegates to best match only
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        //Delegates to best match only
        return this.bestMatch ? this.bestMatch.renderAsSource() : "";
    }
}