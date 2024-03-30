import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { TupleType } from "../../symbols/tuple-type";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class TupleDefNode extends AbstractSequence {
    constructor(field : Field) {
        super(field);
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(OPEN_BRACKET, this.field));
            this.elements.push(new CSV(() => new ExprNode(this.field),2, this.field));
            this.elements.push(new SymbolNode(CLOSE_BRACKET, this.field));
            super.parseText(text);
        }
    }

    get symbolType() {
        const types = (this.elements[1] as CSV).symbolTypes.map(e => e ?? UnknownType.Instance);
        return new TupleType(types);
    }
    
}