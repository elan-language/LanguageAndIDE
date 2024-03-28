import { AbstractSequence } from "./abstract-sequence";
import { IndexableTerm } from "./indexable-term";
import { Multiple } from "./multiple";
import { SymbolNode } from "./symbol-node";
import { Sequence } from "./sequence";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";

export class DottedTerm extends AbstractSequence {
    constructor(field : Field) {
        super(field);
    }

    parseText(text: string): void {
        if (text.trim().length > 0) {
            var dottableTerm = () =>  new IndexableTerm(this.field);
            var dottedAddition = () => new Sequence([() => new SymbolNode(".", this.field), dottableTerm], this.field);
            this.elements.push(dottableTerm());
            this.elements.push(new Multiple(dottedAddition,0, this.field)); 
            super.parseText(text);
        }
    }

    get symbolType() {
        return UnknownType.Instance;
    }
}