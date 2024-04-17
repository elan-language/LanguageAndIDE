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
        this.addElement(this.lhs);
        this.addElement(new SpaceNode(Space.added));
        this.op = new BinaryOperation();
        this.addElement(this.op);
        this.addElement(new SpaceNode(Space.required));
        this.rhs = new ExprNode();
        this.addElement(this.rhs);
        return super.parseText(text);
    }

    renderAsObjectCode(): string {
        const codeArray = this.getElements().map(e => e.renderAsObjectCode());
        const code = codeArray.join("");

        // kludges
        if ((this.rhs as BinaryOperation).matchedText.trim() === "div"){
            return `Math.floor(${code})`;
        }

        return code;
    }

}