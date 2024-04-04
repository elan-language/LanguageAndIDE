import { AbstractAlternatives } from "./abstract-alternatives";
import { CSV } from "./csv";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeWithOptGenerics } from "./type-with-opt-generics";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { RuleNames } from "./rule-names";

export class TypeNode extends AbstractAlternatives {

    constructor() {
        super();
        this.placeholder = "Type";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            var single = new TypeWithOptGenerics();
            var open = () => new SymbolNode(OPEN_BRACKET);
            var csv = () => new CSV(() => new TypeNode(), 2);
            var close =() => new SymbolNode(CLOSE_BRACKET);
            var tuple = new Sequence([open,csv,close], RuleNames.tuple);
            this.alternatives.push(single);
            this.alternatives.push(tuple);
            super.parseText(text);
        }
    }
}
