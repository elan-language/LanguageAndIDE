import { Expression } from "../fields/expression";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { Field } from "../interfaces/field";

export class Print extends AbstractFrame implements Statement {
    isStatement = true;
    expr: Expression;

    constructor(parent: ParentFrame) {
        super(parent);
        this.expr = new Expression(this);
        this.expr.setPrompt("expression");
    }

    getFields(): Field[] {
        return [this.expr];
    }

    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }

    public override selectFirstText(): boolean {
        this.expr.select();
        return true;
    }

    getPrefix(): string {
        return 'print';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>print </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}print ${this.expr.renderAsSource()}`;
    }
} 
