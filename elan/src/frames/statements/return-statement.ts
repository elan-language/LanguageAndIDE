import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class ReturnStatement extends AbstractFrame  { 
    isReturnStatement = true;  
    isStatement = true;
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new Expression(this);
    }

    getFields(): Field[] {
        return [this.expr];
    }

    getIdPrefix(): string {
        return 'return';
    }
    
    public override selectFirstField(): boolean {
        this.expr.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}return ${this.expr.renderAsSource()}`;
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("return ");
        this.expr.parseFrom(source);
    }
} 
