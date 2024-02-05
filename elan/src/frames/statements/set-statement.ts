import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import {ParentFrame} from "../interfaces/parent-frame";
import { SingleLineStatement } from "../single-line-statement";

export class SetStatement extends SingleLineStatement {
    isStatement = true;
    name: Identifier;;
    expr: Expression;

    constructor(parent: ParentFrame) {
        super(parent);
        this.name = new Identifier(this);
        this.name.setPrompt("variableName");
        this.expr = new Expression(this);
    }
    
    getPrefix(): string {
        return 'set';
    }

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 
