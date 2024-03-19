import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { Keyword } from "./keyword";
import { Punctuation } from "./punctuation";
import { TypeWithOptGenerics } from "./type-with-opt-generics";


export class NewInstance extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new Keyword("new"));
        this.elements.push(new TypeWithOptGenerics());
        this.elements.push(new Punctuation("(")); 
        this.elements.push(new CSV(() => new ExprNode(),0)); 
        this.elements.push(new Punctuation(")")); 
        super.parseText(text);
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}