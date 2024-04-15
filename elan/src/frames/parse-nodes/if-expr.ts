import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { ExprNode } from "./expr-node";
import { ifKeyword, elseKeyword, thenKeyword } from "../keywords";
import { SpaceNode } from "./space-node";
import { Space } from "./parse-node-helpers";

export class IfExpr extends AbstractSequence {
    condition: ExprNode | undefined;
    whenTrue: ExprNode | undefined;
    whenFalse: ExprNode | undefined;

    parseText(text: string): void {
        if (text.length > 0) {
            this.elements.push(new KeywordNode(ifKeyword));
            this.elements.push(new SpaceNode(Space.required));
            this.condition = new ExprNode();
            this.elements.push(this.condition);
            this.elements.push(new SpaceNode(Space.required));
            this.elements.push(new KeywordNode(thenKeyword));
            this.elements.push(new SpaceNode(Space.required));
            this.whenTrue = new ExprNode();
            this.elements.push(this.whenTrue);
            this.elements.push(new SpaceNode(Space.required));
            this.elements.push(new KeywordNode(elseKeyword));
            this.elements.push(new SpaceNode(Space.required));
            this.whenFalse = new ExprNode();
            this.elements.push(this.whenFalse);
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        var condition = this.condition!.renderAsHtml();
        var ifTrue = this.whenTrue!.renderAsHtml();
        var ifFalse = this.whenFalse!.renderAsHtml();
        return `<keyword>if </keyword>${condition}<keyword> then </keyword>${ifTrue}<keyword> else </keyword>${ifFalse}`;
    }
    renderAsSource(): string {
        var condition = this.condition!.renderAsSource();
        var ifTrue = this.whenTrue!.renderAsSource();
        var ifFalse = this.whenFalse!.renderAsSource();
        return `if ${condition} then ${ifTrue} else ${ifFalse}`;    
    }
}