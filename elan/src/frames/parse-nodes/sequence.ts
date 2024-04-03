import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";
import { RuleNames } from "./rule-names";

export class Sequence extends AbstractSequence {

    elementConstructors: (() => ParseNode)[];
    constructor(elementConstructors: (() => ParseNode)[], public readonly ruleName?: RuleNames) {
        super();
        this.elementConstructors = elementConstructors;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elementConstructors.forEach(ec => {
                this.elements.push(ec());
            });
        }
        super.parseText(text);
    }
}