import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { Symbol } from "./symbol";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class NewInstance extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new KeywordNode("new"));
        this.elements.push(new TypeWithOptGenerics());
        this.elements.push(new Symbol("("));
        this.elements.push(new CSV(() => new ExprNode(), 0));
        this.elements.push(new Symbol(")"));
        super.parseText(text);
    }
}