import { ParseStatus } from "../parse-status";
import { ParseNode } from "./parse-node";

export abstract class AbstractParseNode implements ParseNode{
    status: ParseStatus = ParseStatus.notParsed;
    matchedText: string = "";
    placeholder: string = "";
    remainingText: string = "";

    abstract parseText(text: string): void;
    abstract renderAsHtml(): string;
    abstract renderAsSource(): string;
}