import { Expression } from "../fields/expression";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { SingleLineStatement } from "./single-line-statement";

export class ReturnStatement extends SingleLineStatement  { 
    isReturnStatement = true;  
    expr: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.expr = new Expression(this);
        this.expr.setText("default");
    }

    getFields(): Field[] {
        return [this.expr];
    }

    getIdPrefix(): string {
        return 'return';
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

    canInsertAfter(): boolean {
        return false;
    }
} 
