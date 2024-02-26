import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { VariableDef } from "../fields/variable";

export class VariableDefStatement extends AbstractFrame  {
    isStatement = true;
    name: VariableDef;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.name = new VariableDef(this);
        this.expr = new Expression(this);
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("var ");
        this.name.parseFrom(source);
        source.remove(" set to ");
        this.expr.parseFrom(source);
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
