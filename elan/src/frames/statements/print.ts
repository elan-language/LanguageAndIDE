import { Statement } from "./statement";
import { Expression } from "../fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Selectable } from "../selectable";
import {Parent} from "../parent";

export class Print extends AbstractFrame implements Statement {
    isStatement = true;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new Expression(this);
        this.expr.setPrompt("expression");
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
