
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";
import { GT, LT } from "../symbols";
import { ofKeyword } from "../keywords";
import { SpaceNode } from "./space-node";
import { Space } from "./parse-node-helpers";

export class TypeWithOptGenerics extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = "Type";
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.length > 0) {
            var simpleType = () => new TypeSimpleNode();
            var lt = () => new SymbolNode(LT);
            var of = () => new KeywordNode(ofKeyword);
            var sp = () => new SpaceNode(Space.required);
            var type = () => new TypeNode();
            var gt =() => new SymbolNode(GT);
            var genericNode = () => new Sequence([lt,of,sp,type,gt]);
            var optGeneric = () => new OptionalNode(genericNode);
            this.elements.push(simpleType());
            this.elements.push(optGeneric());
            super.parseText(text);
        }
    }
}