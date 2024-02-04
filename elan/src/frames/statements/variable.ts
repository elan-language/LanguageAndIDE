import { Statement } from "./statement";
import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Selectable } from "../selectable";
import {Parent} from "../parent";

export class Variable extends AbstractFrame implements Statement {
    isStatement = true;
    name: Identifier;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.name = new Identifier(this);
        this.expr = new Expression(this);

    }
    
    getPrefix(): string {
        return 'var';
    }

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>var </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}var ${this.name.renderAsSource()} set to ${this.expr.renderAsSource()}`;
    }
} 
