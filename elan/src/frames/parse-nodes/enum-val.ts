import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { TypeSimpleNode } from "./type-simple-node";
import { DOT } from "../symbols";

export class EnumVal extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        this.elements.push(new TypeSimpleNode());
        this.elements.push(new SymbolNode(DOT));
        this.elements.push(new IdentifierNode());
        super.parseText(text);
    }
}