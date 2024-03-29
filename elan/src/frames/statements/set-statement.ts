import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import {CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ParseStatus } from "../parse-status";
import { compatibleType } from "../../symbols/rules";
import { ISymbol } from "../../symbols/symbol";
import { Frame } from "../interfaces/frame";
import { AssignableField } from "../fields/assignableField";

export class SetStatement extends AbstractFrame implements Statement{
    isStatement = true;
    assignable: AssignableField;
    expr: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.assignable = new AssignableField(this);
        this.assignable.setPlaceholder("variableName");
        this.expr = new ExpressionField(this);
    }

    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove("set ");
        this.assignable.parseFrom(source);
        source.remove(" to ");
        this.expr.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.assignable, this.expr];
    }  
    getIdPrefix(): string {
        return 'set';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.assignable.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}set ${this.assignable.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
    renderAsObjectCode(): string {
        return `${this.indent()}${this.assignable.renderAsObjectCode()} = ${this.expr.renderAsObjectCode()};`;
    }

    override frameStatus() : ParseStatus {
        const idSymbol = this.resolveSymbol(this.assignable.renderAsSource(), this);
        const expType = this.expr.symbolType;

        return compatibleType(idSymbol, expType);
    }
    
    resolveSymbol(id: string, initialScope : Frame): ISymbol {
        return this.getParent().resolveSymbol(id, initialScope);
    }
} 
