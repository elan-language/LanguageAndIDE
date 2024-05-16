
import { IdentifierNode } from "./identifier-node";
import { AbstractSequence } from "./abstract-sequence";
import { Qualifier } from "./qualifier";
import { KeywordNode } from "./keyword-node";
import { InstanceNode } from "./instanceNode";
import { globalKeyword, libraryKeyword } from "../keywords";
import { Alternatives } from "./alternatives";
import { OptionalNode } from "./optional-node";

export class InstanceProcRef extends AbstractSequence {
    qualifier: OptionalNode | undefined;
    simple: IdentifierNode | undefined;

    constructor() {
        super();
        this.completionWhenEmpty = "variable";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            const global = () => new Qualifier(new KeywordNode(globalKeyword));
            const lib = () => new Qualifier(new KeywordNode(libraryKeyword));
            const instance = () => new Qualifier(new InstanceNode());
            const qualifier = new Alternatives([global, lib, instance]);
            this.qualifier =  new OptionalNode(qualifier);
            this.simple = new IdentifierNode();
            this.addElement(this.qualifier!);
            this.addElement(this.simple!);
            super.parseText(text);
        }
    }

    renderAsHtml(): string {
        return `${this.qualifier!.matchedNode? this.qualifier?.matchedNode.renderAsHtml(): ""}<method>${this.simple?.renderAsHtml()}</method>`;
    }
}