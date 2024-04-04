import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";


import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class BracketedExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new SymbolNode(OPEN_BRACKET));
            this.elements.push(new ExprNode());
            this.elements.push(new SymbolNode(CLOSE_BRACKET));
            super.parseText(text);
        }
    }
}