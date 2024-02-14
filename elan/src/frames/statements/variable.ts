import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class Variable extends AbstractFrame  {
    isStatement = true;
    name: Identifier;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.name = new Identifier(this);
        this.expr = new Expression(this);
    }
    parse(source: CodeSource): void {
        source.removeIndent();
        source.remove("var ");
        this.name.parse(source);
        source.remove(" set to ");
        this.expr.parse(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.name, this.expr];
    } 
    getIdPrefix(): string {
        return 'var';
    }

    public override selectFirstField(): boolean {
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
