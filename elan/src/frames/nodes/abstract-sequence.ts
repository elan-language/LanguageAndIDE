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
        text = text.trimStart();        
        var i = 0; //Index
        var remaining = text;
        var worstStatus: ParseStatus = ParseStatus.notParsed;
        while (i < this.subNodes.length && worstStatus >= ParseStatus.valid) { 
            var node = this.subNodes[i];
            node.parseText(remaining);
            remaining = node.remainingText;
            worstStatus = node.status < worstStatus ? node.status : worstStatus;
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }

}