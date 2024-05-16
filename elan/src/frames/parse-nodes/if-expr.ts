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
            this.addElement(new KeywordNode(ifKeyword));
            this.addElement(new SpaceNode(Space.required));
            this.condition = new ExprNode();
            this.addElement(this.condition);
            this.addElement(new SpaceNode(Space.required));
            this.addElement(new KeywordNode(thenKeyword));
            this.addElement(new SpaceNode(Space.required));
            this.whenTrue = new ExprNode();
            this.addElement(this.whenTrue);
            this.addElement(new SpaceNode(Space.required));
            this.addElement(new KeywordNode(elseKeyword));
            this.addElement(new SpaceNode(Space.required));
            this.whenFalse = new ExprNode();
            this.addElement(this.whenFalse);
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        const condition = this.condition!.renderAsHtml();
        const ifTrue = this.whenTrue!.renderAsHtml();
        const ifFalse = this.whenFalse!.renderAsHtml();
        return `<keyword>if </keyword>${condition}<keyword> then </keyword>${ifTrue}<keyword> else </keyword>${ifFalse}`;
    }
    renderAsSource(): string {
        const condition = this.condition!.renderAsSource();
        const ifTrue = this.whenTrue!.renderAsSource();
        const ifFalse = this.whenFalse!.renderAsSource();
        return `if ${condition} then ${ifTrue} else ${ifFalse}`;    
    }
}