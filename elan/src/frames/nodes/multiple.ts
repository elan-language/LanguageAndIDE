import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class Multiple extends AbstractParseNode {
    elementConstructor: () => ParseNode;
    minimum: number;
    elements: ParseNode[] = [];

    constructor(elementConstructor: () => ParseNode, minimum: number) {
        super();
        this.elementConstructor = elementConstructor;
        this.minimum = minimum;
    }

    parseText(text: string): void {
        if (text.length === 0 ) {
            if (this.minimum === 0) {
                this.status = ParseStatus.valid;
            } else {
                this.status = ParseStatus.invalid;
            }
        } else {
            var toParse = text;
            var cont = true;
            while (cont) { 
                var node = this.elementConstructor();
                node.parseText(toParse);
                if (node.status === ParseStatus.valid) {
                    this.elements.push(node);
                    toParse = node.remainingText;
                } else if (node.status === ParseStatus.incomplete && node.remainingText === "") {
                    this.elements.push(node);
                    toParse = "";
                } else {
                    cont = false;
                }
            }
            if (this.elements.length >= this.minimum) {
                var last = this.elements[this.elements.length - 1];
                this.status = last.status;
                var matchedLength = text.length - toParse.length;
                this.matchedText = text.substring(0, matchedLength);
                this.remainingText = toParse;
            } else {
                this.status = ParseStatus.invalid;
                this.remainingText = text;
            }
        }; 
    }

    textAsHtml(): string {
        //Delegates to best match only
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        //Delegates to best match only
        throw new Error("Method not implemented.");
    }
}