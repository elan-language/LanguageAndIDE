import { ParseStatus } from "../parse-status";

export interface ParseNode {
    status: ParseStatus;
    matchedText: string;
    remainingText: string;
    errorMessage: string;

    parseText(text: string): void;

    renderAsHtml(): string;
    renderAsSource(): string;
    compile(): string;

    getCompletionAsHtml(): string;
    setCompletionWhenEmpty(ph: string): void;
}