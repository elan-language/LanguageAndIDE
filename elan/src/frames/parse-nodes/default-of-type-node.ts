import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { defaultKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class DefaultOfTypeNode extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new KeywordNode(defaultKeyword));
        this.elements.push(new TypeWithOptGenerics()); 
        super.parseText(text);
    }

    get symbolType() {
        return  UnknownType.Instance;
    }
}