import { ExprNode } from "./expr-node";
import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { setKeyword, toKeyword } from "../keywords";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";

export class SetClause extends AbstractSequence {
    property: IdentifierNode | undefined;
    expr: ExprNode | undefined;

    parseText(text: string): void {
        this.property = new IdentifierNode();
        var sp0 =new SpaceNode(Space.required);
        var set = new KeywordNode(setKeyword);
        var sp1 =new SpaceNode(Space.required);
        var to = new KeywordNode(toKeyword);
        var sp2 =new SpaceNode(Space.required);
        this.expr = new ExprNode();
        this.elements.push(this.property);
        this.elements.push(sp0);
        this.elements.push(set);
        this.elements.push(sp1);
        this.elements.push(to);
        this.elements.push(sp2);
        this.elements.push(this.expr);
        return super.parseText(text);
    }
     renderAsObjectCode(): string {
        const codeArray = this.elements.map(e => e.renderAsObjectCode());
        const code = codeArray.join(" ");

        // kludges
        if ((this.elements[1] as BinaryOperation).matchedText.trim() === "div"){
            return `Math.floor(${code})`;
        }

        return code;
    }

}