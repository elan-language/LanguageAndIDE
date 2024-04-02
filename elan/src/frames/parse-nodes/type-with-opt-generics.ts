
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
import { ofKeyword } from "../keywords";
import { ClassType } from "../../symbols/class-type";
import { GenericClassType } from "../../symbols/generic-class-type";

export class TypeWithOptGenerics extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = "Type";
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            var simpleType = () => new TypeSimpleNode();
            var genericNode = () => new Sequence([() => new SymbolNode(LT), () => new KeywordNode(ofKeyword), () => new TypeNode(),() => new SymbolNode(GT)]);
            var optGeneric = () => new OptionalNode(genericNode);
            this.elements.push(simpleType());
            this.elements.push(optGeneric());
            super.parseText(text);
        }
    }
}