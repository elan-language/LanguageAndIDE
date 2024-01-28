import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class ReturnStatement extends AbstractFrame implements Statement {   
    isStatement = true;
    expr: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.expr = new Expression(this);
    }

    getPrefix(): string {
        return 'return';
    }

    public override selectFirstText(): boolean {
        this.expr.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}return ${this.expr.renderAsSource()}`;
    }
} 
