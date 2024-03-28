import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { isHasSymbolType } from "../../symbols/symbolHelpers";

export class BracketedExpression extends AbstractSequence implements IHasSymbolType {
    
    constructor(field : Field) {
        super(field);
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new SymbolNode("(", this.field));
            this.elements.push(new ExprNode(this.field));
            this.elements.push(new SymbolNode(")", this.field));
            super.parseText(text);
        }
    }

    get symbolType() {
        if (isHasSymbolType(this.elements[1])) {
            return this.elements[1].symbolType;
        }

        return UnknownType.Instance;
    }
}