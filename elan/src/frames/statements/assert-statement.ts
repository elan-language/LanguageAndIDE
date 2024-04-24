import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ValueRefField } from "../fields/value-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ExpressionField } from "../fields/expression-field";

export class AssertStatement extends AbstractFrame implements Statement{
    isStatement = true;
    actual: ExpressionField;
    expected: ValueRefField;

    constructor(parent: Parent) {
        super(parent);
        this.actual = new ExpressionField(this);
        this.actual.setPlaceholder("computed result");
        this.expected = new ValueRefField(this);
        this.expected.setPlaceholder("expected value");
    }
    
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("assert ");
        this.actual.parseFrom(source);
        source.remove(" is ");
        this.expected.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.actual, this.expected];
    }

    getIdPrefix(): string {
        return 'assert';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>assert </keyword>${this.actual.renderAsHtml()}<keyword> is </keyword>${this.expected.renderAsHtml()}</statement>`;
    }
   
    renderAsSource(): string {
        return `${this.indent()}assert ${this.actual.renderAsSource()} is ${this.expected.renderAsSource()}`;
    }
} 
