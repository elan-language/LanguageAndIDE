import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class Optional extends AbstractParseNode {
    elementConstructor: () => ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var option = this.elementConstructor();
            option.parseText(text);
            if (option.status === ParseStatus.valid || (option.status === ParseStatus.incomplete && option.remainingText === "")) {
                this.updateFrom(option);
            } else {
                this.status = ParseStatus.valid;
                this.remainingText = text;
            }
        } else {
            this.status = ParseStatus.valid;
        }
    }
    renderAsHtml(selected: boolean | undefined): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        return this.matchedText.length > 0 ? ` ${this.matchedText}` : ``;
    }
}