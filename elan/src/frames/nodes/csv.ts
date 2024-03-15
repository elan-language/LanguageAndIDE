import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { Multiple } from "./multiple";
import { Optional } from "./optional";
import { ParseNode } from "./parse-node";

//A list of comma-separated values of a specified type, but with no list delimiters
export class CSV extends AbstractSequence {
    elementConstructor:  () => ParseNode;
    minimum: number;

    constructor(elementConstructor: () => ParseNode, minimum: number) {
        super();
        this.elementConstructor = elementConstructor;
        this.minimum = minimum;
    }

    parseText(text: string): void {
        this.remainingText = text;
        var commaNodesMin = 0;
        if (text.trimStart().length > 0) {
            if (this.minimum === 0) {
                this.elements.push(new Optional(this.elementConstructor));
            } else {
                this.elements.push(this.elementConstructor());
                commaNodesMin = this.minimum -1;
            }
            this.elements.push(new Multiple(() => new CommaNode(this.elementConstructor), commaNodesMin));
            super.parseText(text);
        }
    }

    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }

}