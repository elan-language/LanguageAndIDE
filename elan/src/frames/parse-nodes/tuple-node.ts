import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { TupleType } from "../../symbols/tuple-type";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class TupleNode extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(OPEN_BRACKET));
            this.elements.push(new CSV(() => new ExprNode(),2));
            this.elements.push(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
}