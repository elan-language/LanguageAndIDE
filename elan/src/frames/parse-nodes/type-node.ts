import { AbstractAlternatives } from "./abstract-alternatives";
import { CSV } from "./csv";
import { Symbol } from "./symbol";
import { Sequence } from "./sequence";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class TypeNode extends AbstractAlternatives {

    constructor() {
        super();
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var single = new TypeWithOptGenerics();
            var tuple = new Sequence([() => new Symbol("("),() => new CSV(() => new TypeNode(), 2), () => new Symbol(")") ]);
            this.alternatives.push(single);
            this.alternatives.push(tuple);
            super.parseText(text);
        }
    }
}
