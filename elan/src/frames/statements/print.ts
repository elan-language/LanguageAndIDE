import { Expression } from "../fields/expression";
import {ParentFrame} from "../interfaces/parent-frame";
import { SingleLineStatement } from "../single-line-statement";

export class Print extends SingleLineStatement {
    isStatement = true;
    expr: Expression;

    constructor(parent: ParentFrame) {
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
