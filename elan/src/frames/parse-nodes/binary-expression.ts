import { ExprNode } from "./expr-node";
import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { Term } from "./term";
import { SpaceNode } from "./space-node";
import { Space as Space } from "./parse-node-helpers";

export class BinaryExpression extends AbstractSequence {
    lhs: Term | undefined;
    op: BinaryOperation | undefined;
    rhs: Term | undefined;
    
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.lhs =new Term();
        this.elements.push(this.lhs);
        this.elements.push(new SpaceNode(Space.added));
        this.op = new BinaryOperation();
        this.elements.push(this.op);
        this.elements.push(new SpaceNode(Space.added));
        this.rhs = new ExprNode();
        this.elements.push(this.rhs);
        return super.parseText(text);
    }

    renderAsObjectCode(): string {
        const codeArray = this.elements.map(e => e.renderAsObjectCode());
        const code = codeArray.join("");

        // kludges
        if ((this.elements[2] as BinaryOperation).matchedText.trim() === "div"){
            return `Math.floor(${code})`;
        }

        return code;
    }

}