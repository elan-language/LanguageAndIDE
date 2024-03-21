import { notKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { Symbol } from "./symbol";
import { Keyword } from "./keyword";

export class UnaryOp extends AbstractAlternatives {
    parseText(text: string): void {
        this.alternatives.push(new Symbol("-"));
        this.alternatives.push(new Keyword(notKeyword));
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}