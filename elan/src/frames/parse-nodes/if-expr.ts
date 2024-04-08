import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { ExprNode } from "./expr-node";
import { UnknownType } from "../../symbols/unknown-type";
import { Field } from "../interfaces/field";
import { ifKeyword, elseKeyword, thenKeyword } from "../keywords";

export class IfExpr extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new KeywordNode(ifKeyword));
            this.elements.push(new ExprNode());
            this.elements.push(new KeywordNode(thenKeyword));
            this.elements.push(new ExprNode());
            this.elements.push(new KeywordNode(elseKeyword));
            this.elements.push(new ExprNode()); 
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        var condition = this.elements[1].renderAsHtml();
        var ifTrue = this.elements[3].renderAsHtml();
        var ifFalse = this.elements[5].renderAsHtml();
        return `<keyword>if </keyword>${condition}<keyword> then </keyword>${ifTrue}<keyword> else </keyword>${ifFalse}`;
    }
    renderAsSource(): string {
        var condition = this.elements[1].renderAsSource();
        var ifTrue = this.elements[3].renderAsSource();
        var ifFalse = this.elements[5].renderAsSource();
        return `if ${condition} then ${ifTrue} else ${ifFalse}`;    
    }
}