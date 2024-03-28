import { IntType } from "../../symbols/int-type";
import { Field } from "../interfaces/field";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";

export class DeconstructedList extends AbstractSequence {

    constructor(field: Field) {
        super(field);
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode(`[`, this.field));
            this.elements.push(new IdentifierNode(this.field));
            this.elements.push(new SymbolNode(`:`, this.field));
            this.elements.push(new IdentifierNode(this.field));
            this.elements.push(new SymbolNode(`]`, this.field));
            super.parseText(text);
        }
    }
    get symbolType() {
        return IntType.Instance;
    }

}