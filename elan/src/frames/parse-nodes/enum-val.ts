import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { TypeSimpleNode } from "./type-simple-node";

export class EnumVal extends AbstractSequence {
    constructor(field: Field) {
        super(field);
    }

    parseText(text: string): void {
        this.elements.push(new TypeSimpleNode(this.field));
        this.elements.push(new SymbolNode(".", this.field));
        this.elements.push(new IdentifierNode(this.field));
        super.parseText(text);
    }

    get symbolType() {
        return UnknownType.Instance;
    }
}