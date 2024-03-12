import { notKeyword } from "../keywords";
import { Alternatives } from "./abstract-alternatives";
import { FixedText } from "./fixed-text";
import { Keyword } from "./keyword";

export class UnaryOp extends Alternatives {
    parseText(text: string): void {
        this.alternatives.push(new FixedText("-"));
        this.alternatives.push(new Keyword(notKeyword));
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }
}