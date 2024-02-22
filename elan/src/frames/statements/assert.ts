import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Value } from "../fields/value";


export class Assert extends AbstractFrame {

    isStatement = true;
    expected: Value;

    constructor(parent: Parent) {
        super(parent);
        this.expected = new Value(this);
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

    public override selectFirstField(): boolean {
        this.expected.select();
        return true;
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
