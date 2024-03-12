import { Alternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { Term } from "./term";

export class Expression extends Alternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.alternatives.push(new Term());
        this.alternatives.push(new BinaryExpression());
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }
    
}