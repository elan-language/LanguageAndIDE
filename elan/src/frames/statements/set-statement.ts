import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";

export class SetStatement extends AbstractFrame  {
    isStatement = true;
    name: Identifier;;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.name = new Identifier(this);
        this.name.setLabel("variableName");
        this.expr = new Expression(this);
    }

    getFields(): Field[] {
        return [this.name, this.expr];
    }
    
    getIdPrefix(): string {
        return 'set';
    }

    public override selectFirstField(): boolean {
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
