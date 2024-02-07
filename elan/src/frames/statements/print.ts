import { Expression } from "../fields/expression";
import {Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { Field } from "../interfaces/field";

export class Print extends AbstractFrame  {
    isStatement = true;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new Expression(this);
        this.expr.setPrompt("expression");
    }

    getFields(): Field[] {
        return [this.expr];
    }

    public override selectFirstField(): boolean {
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
