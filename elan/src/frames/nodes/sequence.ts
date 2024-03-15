
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";

export class Sequence extends AbstractSequence {

    elementConstructors: (() =>ParseNode)[];
    constructor(elementConstructors: (() =>ParseNode)[]) {
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

    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
}