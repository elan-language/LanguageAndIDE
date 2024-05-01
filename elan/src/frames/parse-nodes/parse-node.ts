import { CodeStatus } from "../code-status";

export interface ParseNode {
    status: CodeStatus;
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