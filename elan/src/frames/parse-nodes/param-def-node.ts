import { asKeyword, refKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { Sequence } from "./sequence";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class ParamDefNode extends AbstractSequence {
    ref: OptionalNode | undefined;
    name: IdentifierNode | undefined;
    type: TypeNode | undefined;

    parseText(text: string): void {
        if (text.trim().length > 0) {
            this.ref = new OptionalNode(new Sequence([() => new KeywordNode(refKeyword),  () => new SpaceNode(Space.required)]));
            this.addElement(this.ref);
            this.name = new IdentifierNode();
            this.addElement(this.name);
            this.addElement(new SpaceNode(Space.required));
            this.addElement(new KeywordNode(asKeyword));
            this.addElement(new SpaceNode(Space.required));
            this.type = new TypeNode();
            this.addElement(this.type);
            super.parseText(text);
        }
    }
}