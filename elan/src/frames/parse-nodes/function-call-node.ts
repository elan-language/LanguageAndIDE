import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { SymbolNode } from "./symbol-node";
import { IdentifierNode } from "./identifier-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";

export class FunctionCallNode extends AbstractSequence {
    constructor(field : Field) {
        super(field);
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.elements.push(new IdentifierNode(this.field));
            this.elements.push(new SymbolNode("(",this.field));
            this.elements.push(new CSV(() => new ExprNode(this.field),0,this.field)); //arg list
            this.elements.push(new SymbolNode(")",this.field));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        return `<method>${this.elements[0].renderAsHtml()}</method>(${this.elements[2].renderAsHtml()})`;
    }
    
    get symbolType() {
        return UnknownType.Instance;
    }
}