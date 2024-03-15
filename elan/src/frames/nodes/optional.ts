import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export class Optional extends AbstractParseNode {
    option: ParseNode;

    constructor(option: ParseNode) {
        super();
        this.option = option;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            var option = this.option;
            option.parseText(text);
            if (option.status === ParseStatus.valid || (option.status === ParseStatus.incomplete && option.remainingText === "")) {
                this.updateFrom(option);
            } else {
                this.status = ParseStatus.valid;
                this.remainingText = text;
            }
        }
    }
    textAsHtml(selected: boolean | undefined): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }

}