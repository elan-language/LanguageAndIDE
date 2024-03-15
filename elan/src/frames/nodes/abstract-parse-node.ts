import { ParseStatus } from "../parse-status";
import { ParseNode } from "./parse-node";

export abstract class AbstractParseNode implements ParseNode{
    status: ParseStatus = ParseStatus.notParsed;
    matchedText: string = "";
    placeholder: string = "";
    remainingText: string = "";

    abstract parseText(text: string): void;
    abstract textAsHtml(selected: boolean | undefined): string;
    abstract textAsSource(): string;
    textAsObjectCode(): string {return "To be implemented"; } ; //TODO make abstract

    protected set(status: ParseStatus, matched: string, remaining: string) {
        this.status = status;
        this.matchedText = matched;
        this.remainingText = remaining;
    }
        
    protected numLeadingSpaces(text: string): number {
        return text.length - text.trimStart().length;
    }
}