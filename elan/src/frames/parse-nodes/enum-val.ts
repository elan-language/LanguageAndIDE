import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";
import { RegExMatchNode } from "./regex-match-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";

export class EnumVal extends AbstractSequence {
    constructor(field: Field) {
        super(field);
    }

    parseText(text: string): void {
        this.elements.push(new RegExMatchNode(/^\s*[A-Z]\w*/, this.field));
        this.elements.push(new SymbolNode(".", this.field));
        this.elements.push(new IdentifierNode(this.field));
        super.parseText(text);
    }

    get symbolType() {
        return UnknownType.Instance;
    }
}