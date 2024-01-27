import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Print extends AbstractFrame implements Statement {
    getPrefix(): string {
        return 'print';
    }
    expr: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.expr = new Expression(this);
        this.expr.setPrompt("expression");
    }

    public override selectFirstText(): boolean {
        this.expr.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>print </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}print ${this.expr.renderAsSource()}`;
    }
} 
