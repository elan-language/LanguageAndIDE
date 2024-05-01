import { CodeStatus } from "../code-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export abstract class AbstractSequence extends AbstractParseNode {
    
    private elements: ParseNode[] = [];

    protected addElement(node: ParseNode) {
        this.elements.push(node);
    }

    public getElements(): ParseNode[] {
        return this.elements;
    }

    parseText(text: string): void {
        var i = 0; //Index
        var remaining = text;
        var worstStatus: CodeStatus = CodeStatus.notParsed;
        while (i < this.elements.length && worstStatus >= CodeStatus.valid) {
            var node = this.elements[i];
            node.parseText(remaining);
            remaining = node.remainingText;
            if (node.status === CodeStatus.empty) {
                worstStatus = worstStatus === CodeStatus.notParsed ? CodeStatus.empty : CodeStatus.incomplete;
            } else {
                worstStatus = node.status < worstStatus ? node.status : worstStatus;
            }
            i++;
        }
        this.status = worstStatus;
        if (worstStatus > CodeStatus.invalid) {
            this.remainingText = remaining;
            this.matchedText = text.substring(0, text.length - this.remainingText.length);
        } else {
            this.remainingText = text;
        }
    }
    renderAsHtml(): string {
        return this.elements.reduce((result, current) => result + current.renderAsHtml(), "");
    }
    renderAsSource(): string {
        return this.elements.reduce((result, current) => result + current.renderAsSource(), "");
    }
    compile(): string {
        return this.elements.reduce((result, current) => result + current.compile(), "");
    }
    getCompletionAsHtml(): string {
        return this.elements.length > 0 ? this.elements.reduce((result, current) => `${result}${current.getCompletionAsHtml()}`, "") : super.getCompletionAsHtml();
    }
}