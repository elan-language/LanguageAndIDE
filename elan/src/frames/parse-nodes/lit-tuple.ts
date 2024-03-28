import { IntType } from "../../symbols/int-type";
import { Field } from "../interfaces/field";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { LiteralNode } from "./literal-node";
import { SymbolNode } from "./symbol-node";

export class LitTuple extends AbstractSequence {

    constructor(field: Field) {
        super(field);
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(`(`, this.field));
            this.elements.push(new CSV(() => new LiteralNode(this.field),2, this.field));
            this.elements.push(new SymbolNode(`)`, this.field));
            super.parseText(text);
        }
    }
    get symbolType() {
        return IntType.Instance;
    }

}