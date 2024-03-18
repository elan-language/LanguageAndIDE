import { ParseStatus } from "../parse-status";

export interface ParseNode {

status: ParseStatus;
matchedText: string;
remainingText: string;

//TODO: eventually the parsing should interact with symbol table where appropriate, including identifier and type checking
//returns any unused text
parseText(text: string): void;

renderAsHtml(selected: boolean | undefined): string;
renderAsSource(): string;
renderAsObjectCode(): string;

}