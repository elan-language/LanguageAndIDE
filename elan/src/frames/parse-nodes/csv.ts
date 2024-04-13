
import { AbstractSequence } from "./abstract-sequence";
import { CommaNode } from "./comma-node";
import { Multiple } from "./multiple";
import { OptionalNode } from "./optional-node";
import { ParseNode } from "./parse-node";
import { Sequence } from "./sequence";

//A list of comma-separated values of a specified type, but with no list delimiters
export class CSV extends AbstractSequence {
    elementConstructor: () => ParseNode;
    minimum: number;

    constructor(elementConstructor: () => ParseNode, minimum: number) {
        super();
        this.elementConstructor = elementConstructor;
        this.minimum = minimum;
    }

    parseText(text: string): void {
        this.remainingText = text;
        var commaNodesMin = 0;
        var commaNode = () => new CommaNode(this.elementConstructor());

        if (this.minimum === 0) {
            this.elements.push(new OptionalNode(this.elementConstructor));
        } else {
            this.elements.push(this.elementConstructor());
            commaNodesMin = this.minimum - 1;
        }
        this.elements.push(new Multiple(commaNode, commaNodesMin));
        super.parseText(text);
    }
}