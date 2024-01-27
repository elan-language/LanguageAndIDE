import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Variable extends AbstractFrame implements Statement {
    getPrefix(): string {
        return 'var';
    }
    
    name: Identifier;
    expr: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.name = new Identifier(this);
        this.expr = new Expression(this);

    }

    public override selectFirstText(): boolean {
        this.name.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>var </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}var ${this.name.renderAsSource()} set to ${this.expr.renderAsSource()}`;
    }
} 
