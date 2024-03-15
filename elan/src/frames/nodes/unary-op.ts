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
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
}