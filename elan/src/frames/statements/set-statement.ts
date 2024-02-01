import { Statement } from "./statement";
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import {Parent} from "../parent";

export class SetStatement extends AbstractFrame implements Statement {
    isStatement = true;
    name: Identifier;;
    expr: Expression;

    constructor(parent: Parent) {
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
