import { Expression } from "../fields/expression";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class ReturnStatement extends AbstractFrame implements Statement {   
    isStatement = true;
    expr: Expression;

    constructor(parent: ParentFrame) {
        super(parent);
        this.expr = new Expression(this);
    }
   
    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }

    getPrefix(): string {
        return 'return';
    }
    
    public override selectFirstText(): boolean {
        this.expr.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}return ${this.expr.renderAsSource()}`;
    }
} 
