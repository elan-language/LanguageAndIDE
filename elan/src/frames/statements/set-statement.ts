import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { CodeFrame } from "../code-frame";
import { Frame } from "../frame";

export class SetStatement extends CodeFrame implements Statement {
    isStatement = true;
    name: Identifier;;
    expr: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.name = new Identifier(this);
        this.name.setPrompt("variableName");
        this.expr = new Expression(this);
    }
    
    getPrefix(): string {
        return 'set';
    }

    public override selectFirstText(): boolean {
        this.name.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 
