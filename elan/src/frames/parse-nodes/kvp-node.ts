import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { ParseNode } from "./parse-node";
import { Field } from "../interfaces/field";
import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { COLON } from "../symbols";
import { ParseStatus } from "../parse-status";

export class KVPnode extends AbstractSequence implements IHasSymbolType  {
    keyConstructor: () => ParseNode;
    valueConstructor: () => ParseNode;

    constructor(keyConstructor: () => ParseNode, valueConstructor: () => ParseNode , field : Field) {
        super(field);
        this.keyConstructor = keyConstructor;
        this.valueConstructor = valueConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(this.keyConstructor());
            this.elements.push(new SymbolNode(COLON, this.field));
            this.elements.push(this.valueConstructor());
            super.parseText(text);
        }
    }

    getCompletion(): string {
        var comp = "";
        comp += this.elements[0].status === ParseStatus.empty? "key": "";
        comp += this.elements[1].getCompletion();
        comp += this.elements[2].status === ParseStatus.empty? " value": "";
        return comp;
    }
    
    get symbolType() {
         return undefined;
    }
}