import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { ExprNode } from "./expr-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { ifKeyword, elseKeyword, thenKeyword } from "../keywords";

export class IfExpr extends AbstractSequence {
    constructor(field : Field) {
        super(field);
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new KeywordNode(ifKeyword, this.field));
            this.elements.push(new ExprNode(this.field));
            this.elements.push(new KeywordNode(thenKeyword, this.field));
            this.elements.push(new ExprNode(this.field));
            this.elements.push(new KeywordNode(elseKeyword, this.field));
            this.elements.push(new ExprNode(this.field)); 
            super.parseText(text);
        }
    }
    
    get symbolType() {
        return UnknownType.Instance;
    }

    renderAsHtml(): string {
        var condition = this.elements[1].renderAsHtml();
        var ifTrue = this.elements[3].renderAsHtml();
        var ifFalse = this.elements[1].renderAsHtml();
        return `<keyword>if </keyword>${condition}<keyword> then </keyword>${ifTrue}<keyword> else </keyword>${ifFalse}`;
    }
    renderAsSource(): string {
        var condition = this.elements[1].renderAsSource();
        var ifTrue = this.elements[3].renderAsSource();
        var ifFalse = this.elements[1].renderAsSource();
        return `if ${condition} then ${ifTrue} else ${ifFalse}`;    
    }
}