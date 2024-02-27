import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import {CodeSource } from "../code-source";
import { Value } from "../fields/value";

export class SetStatement extends AbstractFrame  {
    isStatement = true;
    name: Value;;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.name = new Value(this);
        this.name.setPlaceholder("variableName");
        this.expr = new Expression(this);
    }

    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("set ");
        this.name.parseFrom(source);
        source.remove(" to ");
        this.expr.parseFrom(source);
        source.removeNewLine();
    }

    getFields(): Field[] {
        return [this.name, this.expr];
    }
    
    getIdPrefix(): string {
        return 'set';
    }

    public override selectFirstFieldOrChildIfNone(): boolean {
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
