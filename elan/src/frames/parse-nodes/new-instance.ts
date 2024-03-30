import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { SymbolNode } from "./symbol-node";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class NewInstance extends AbstractSequence {
    constructor(field : Field) {
        super(field);
    }

    parseText(text: string): void {
        this.elements.push(new KeywordNode("new", this.field));
        this.elements.push(new TypeWithOptGenerics(this.field));
        this.elements.push(new SymbolNode(OPEN_BRACKET, this.field)); 
        this.elements.push(new CSV(() => new ExprNode(this.field),0, this.field)); 
        this.elements.push(new SymbolNode(CLOSE_BRACKET, this.field)); 
        super.parseText(text);
    }

    get symbolType() {
        return  UnknownType.Instance;
    }
}