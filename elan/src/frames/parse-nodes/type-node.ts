import { AbstractAlternatives } from "./abstract-alternatives";
import { CSV } from "./csv";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeWithOptGenerics } from "./type-with-opt-generics";
import { Field } from "../interfaces/field";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class TypeNode extends AbstractAlternatives {

    constructor() {
        super();
        this.placeholder = "Type";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var single = new TypeWithOptGenerics();
            var tuple = new Sequence([() => new SymbolNode(OPEN_BRACKET),() => new CSV(() => new TypeNode(), 2), () => new SymbolNode(CLOSE_BRACKET) ]);
            this.alternatives.push(single);
            this.alternatives.push(tuple);
            super.parseText(text);
        }
    }
}
