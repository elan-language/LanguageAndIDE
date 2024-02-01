import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { CodeFrame } from "../code-frame";
import { Frame } from "../frame";
import {Parent} from "../parent";

export class Variable extends CodeFrame implements Statement {
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
