
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { TypeNode } from "./type-node";
import { TypeSimpleNode } from "./type-simple-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { GT, LT } from "../symbols";

export class TypeWithOptGenerics extends AbstractSequence {

    constructor(field : Field) {
        super(field);
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var simpleType = () => new TypeSimpleNode(this.field);
            var genericNode = () => new Sequence([() => new SymbolNode(LT, this.field), () => new KeywordNode("of", this.field), () => new TypeNode(this.field),() => new SymbolNode(GT, this.field)], this.field);
            var optGeneric = () => new OptionalNode(genericNode, this.field);
            this.elements.push(simpleType());
            this.elements.push(optGeneric());
            super.parseText(text);
        }
    }

    get symbolType() {
        return UnknownType.Instance;
    }
}