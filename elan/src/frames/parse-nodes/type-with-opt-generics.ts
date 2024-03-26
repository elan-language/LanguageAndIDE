
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Optional } from "./optional";
import { Symbol } from "./symbol";
import { Sequence } from "./sequence";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";

export class TypeWithOptGenerics extends AbstractSequence {

    constructor() {
        super();
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var simpleType = () => new TypeSimpleNode();
            var genericNode = () => new Sequence([() => new Symbol("<"), () => new KeywordNode("of"), () => new TypeNode(), () => new Symbol(">")]);
            var optGeneric = () => new Optional(genericNode);
            this.elements.push(simpleType());
            this.elements.push(optGeneric());
            super.parseText(text);
        }
    }
}