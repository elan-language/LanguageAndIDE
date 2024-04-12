import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { IndexNode } from "./index-node";
import { OptionalNode } from "./optional-node";

export class InstanceNode extends AbstractSequence {
    variable: IdentifierNode | undefined;
    index: OptionalNode | undefined;

    parseText(text: string): void {
        if (text.length > 0) {
            this.variable =  new IdentifierNode();
            this.index = new OptionalNode(() => new IndexNode());
            this.elements.push(this.variable);
            this.elements.push(this.index);
            super.parseText(text);
        }
    }
}