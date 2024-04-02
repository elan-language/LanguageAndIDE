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
import { setKeyword, toKeyword } from "../keywords";
import { SetTargetField } from "../fields/setTargetField";

export class SetStatement extends AbstractFrame implements Statement{
    isStatement = true;
    assignable: SetTargetField;
    expr: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.assignable = new SetTargetField(this);
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
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${setKeyword} </keyword>${this.assignable.renderAsHtml()}<keyword> ${toKeyword} </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}${setKeyword} ${this.assignable.renderAsSource()} ${toKeyword} ${this.expr.renderAsSource()}`;
    }
    renderAsObjectCode(): string {
        return `${this.indent()}${this.assignable.renderAsObjectCode()} = ${this.expr.renderAsObjectCode()};`;
    }
} 
