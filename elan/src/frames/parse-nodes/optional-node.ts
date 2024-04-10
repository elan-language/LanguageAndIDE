
import { UnknownType } from "../../symbols/unknown-type";

import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class OptionalNode extends AbstractParseNode {
    elementConstructor: () => ParseNode;
    matchedNode?: ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            var option = this.elementConstructor();
            option.parseText(text);
            if (option.status === ParseStatus.valid || (option.status === ParseStatus.incomplete && option.remainingText.trim() === "")) {
                this.updateFrom(option);
                this.matchedNode = option;
            } else {
                this.status = ParseStatus.valid;
                this.remainingText = text;
            }
        } else {
            this.status = ParseStatus.valid;
        }
    }
    renderAsHtml(): string {
        return this.matchedNode ? this.matchedNode.renderAsHtml() : "";
    }
    renderAsSource(): string {
        return this.matchedNode ? this.matchedNode.renderAsSource() : "";
    }

    getCompletionAsHtml(): string {
        return this.matchedNode? this.matchedNode.getCompletionAsHtml() : super.getCompletionAsHtml();
    }
}