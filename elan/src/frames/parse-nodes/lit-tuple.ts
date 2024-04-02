import { IntType } from "../../symbols/int-type";
import { Field } from "../interfaces/field";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { LiteralNode } from "./literal-node";
import { SymbolNode } from "./symbol-node";

export class LitTuple extends AbstractSequence {

    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(OPEN_BRACKET));
            this.elements.push(new CSV(() => new LiteralNode(),2));
            this.elements.push(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
    get symbolType() {
        return IntType.Instance;
    }

}