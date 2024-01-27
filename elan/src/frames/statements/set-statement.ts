import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class SetStatement extends AbstractFrame implements Statement {
    getPrefix(): string {
        return 'set';
    }
    
    name: Identifier;;
    expr: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.name = new Identifier(this);
        this.name.setPrompt("variableName");
        this.expr = new Expression(this);
    }

    public override selectFirstText(): boolean {
        this.name.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 
