import { CodeStatus } from "../code-status";
import { AbstractParseNode } from "./abstract-parse-node";

export abstract class FixedTextNode extends AbstractParseNode {
    fixedText: string;

    constructor(fixedText: string) {
        super();
        this.fixedText = fixedText;
        this.completionWhenEmpty = fixedText;
    }

    protected getErrorMessage() : string {
        return `must match ${this.fixedText}`;
    }

    getCompletionAsHtml(): string {
        return this.status === CodeStatus.empty ? `${this.fixedText}` : "";
    }
}
