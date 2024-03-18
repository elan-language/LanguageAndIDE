import { notKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Punctuation } from "./punctuation";
import { Keyword } from "./keyword";
import { FixedTextLeadingSpace } from "./fixedTextLeadingSpace";

export class UnaryOp extends AbstractAlternatives {
    parseText(text: string): void {
        this.alternatives.push(new FixedTextLeadingSpace("-"));
        this.alternatives.push(new Keyword(notKeyword));
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}