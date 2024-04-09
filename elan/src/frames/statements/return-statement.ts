import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";
import { AbstractFrame } from "../abstract-frame";
import { ReturnExprField } from "../fields/return-expr-field";

export class ReturnStatement extends AbstractFrame implements Statement{
    isStatement = true; 
    isReturnStatement = true;  
    returnExpr: ReturnExprField;

    constructor(parent: Parent) {
        super(parent);
        this.movable = false;
        this.returnExpr = new ReturnExprField(this);
    }

    deleteIfPermissible(): void {}; //Does nothing as return cannot be deleted

    getFields(): Field[] {
        return [this.returnExpr];
    }

    getIdPrefix(): string {
        return 'return';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.returnExpr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}return ${this.returnExpr.renderAsSource()}`;
    }

    renderAsObjectCode(): string {
        return `${this.indent()}return ${this.returnExpr.renderAsObjectCode()};`;
    }

    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("return ");
        this.returnExpr.parseFrom(source);
    }

    canInsertAfter(): boolean {
        return false;
    }
} 
