import { AbstractAlternatives } from "./abstract-alternatives";
import { CSV } from "./csv";
import { Punctuation } from "./punctuation";
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
            var tuple = new Sequence([() => new Punctuation("("),() => new CSV(() => new TypeNode(), 2), () => new Punctuation(")") ]);
            this.alternatives.push(single);
            this.alternatives.push(tuple);
            super.parseText(text);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}
