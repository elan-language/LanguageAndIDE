import { ParseStatus } from "../parse-status";
import { AbstractParseNode } from "./abstract-parse-node";
import { Symbol } from "./symbol";

//BinOps are distinct from other symbols as they are rendered with a space before and after
export class BinOp extends Symbol {

    constructor(symbol: string) {
        super(symbol);
        this.fixedText = symbol;
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }

    renderAsSource(): string {
        return ` ${this.matchedText.trim()} `;
    }
}
