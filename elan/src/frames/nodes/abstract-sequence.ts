import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class AbstractSequence extends AbstractParseNode {
    
    subNodes: ParseNode[] = [];

    constructor() {
        super();
        this.placeholder = "op";
    }

    parseText(text: string): void {    
        var i = 0; //Index
        var remaining = text;
        var worstStatus: ParseStatus = ParseStatus.empty;
        while (i < this.subNodes.length && worstStatus >= ParseStatus.valid) { 
            if (remaining.trimStart().length === 0) {
                worstStatus = ParseStatus.incomplete;
            } else {
                var node = this.subNodes[i];
                node.parseText(remaining);
                remaining = node.remainingText;
                worstStatus = node.status < worstStatus ? node.status : worstStatus;
                i++;
            }
        }
        this.status = worstStatus;
        this.remainingText = remaining;
        this.matchedText = text.substring(0, text.length - this.remainingText.length); //WRONG! due to spaces
    }
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
}