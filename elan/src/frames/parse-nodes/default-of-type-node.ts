import { defaultKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class DefaultOfTypeNode extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new KeywordNode(defaultKeyword));
        this.elements.push(new SpaceNode(Space.required));
        this.elements.push(new TypeWithOptGenerics()); 
        super.parseText(text);
    }
}