import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { newKeyword } from "../keywords";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { KeywordNode } from "./keyword-node";
import { SymbolNode } from "./symbol-node";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class NewInstance extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new KeywordNode(newKeyword));
        this.elements.push(new TypeWithOptGenerics());
        this.elements.push(new SymbolNode(OPEN_BRACKET)); 
        this.elements.push(new CSV(() => new ExprNode(),0)); 
        this.elements.push(new SymbolNode(CLOSE_BRACKET)); 
        super.parseText(text);
    }

    get symbolType() {
        return  UnknownType.Instance;
    }
}