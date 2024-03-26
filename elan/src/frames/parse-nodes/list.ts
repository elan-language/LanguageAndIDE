import { AbstractSequence } from "./abstract-sequence";
import { Symbol } from "./symbol";
import { CSV } from "./csv";
import { ParseNode } from "./parse-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { ListType } from "../../symbols/list-type";
import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { isHasSymbolType, isHasSymbolTypes } from "../../symbols/symbolHelpers";

export class List extends AbstractSequence implements IHasSymbolType  {
    elementConstructor: () => ParseNode;

    constructor(elementConstructor: () => ParseNode, field : Field) {
        super(field);
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Symbol(`[`, this.field));
            this.elements.push(new CSV(this.elementConstructor, 0, this.field));
            this.elements.push(new Symbol(`]`, this.field));
            super.parseText(text);
        }
    }
    
    get symbolType() {
       
        if (isHasSymbolType(this.elements[1])) {
            const ofType = this.elements[1].symbolType;
            return new ListType(ofType || UnknownType.Instance);
        }

        if (isHasSymbolTypes(this.elements[1])) {
            const ofType = this.elements[1].symbolTypes[0];
            return new ListType(ofType || UnknownType.Instance);
        }

        return new ListType(UnknownType.Instance);
    }
}