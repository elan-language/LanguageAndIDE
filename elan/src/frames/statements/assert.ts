import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ValueRefField } from "../fields/value-ref-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class Assert extends AbstractFrame implements Statement{
    isStatement = true;
    expected: ValueRefField;

    constructor(parent: Parent) {
        super(parent);
        this.expected = new ValueRefField(this);
        this.expected.setPlaceholder("expected value");
    }
    
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("assert result is ");
        this.expected.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.expected];
    }

    getIdPrefix(): string {
        return 'assert';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>assert </keyword><span>result</span><keyword> is </keyword>${this.expected.renderAsHtml()}</statement>`;
    }
   
    renderAsSource(): string {
        return `${this.indent()}assert result is ${this.expected.renderAsSource()}`;
    }
} 
