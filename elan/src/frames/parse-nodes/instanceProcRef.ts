
import { IdentifierNode } from "./identifier-node";
import { AbstractSequence } from "./abstract-sequence";
import { Qualifier } from "./qualifier";

export class InstanceProcRef extends AbstractSequence {
    qualifier: IdentifierNode | undefined;
    simple: IdentifierNode | undefined;

    constructor() {
        super();
        this.completionWhenEmpty = "variable";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.qualifier = new Qualifier(new IdentifierNode());
            this.simple = new IdentifierNode();
            this.addElement(this.qualifier!);
            this.addElement(this.simple!);
            super.parseText(text);
        }
    }
}