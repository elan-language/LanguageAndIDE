import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import {CodeSource } from "../code-source";
import { Value } from "../fields/value";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class SetStatement extends AbstractFrame implements Statement{
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
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 
