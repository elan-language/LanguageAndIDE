import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import {CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { setKeyword, toKeyword } from "../keywords";
import { AssignableField } from "../fields/assignableField";
import { mustBeCompatibleType } from "../compile-rules";

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
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${setKeyword} </keyword>${this.assignable.renderAsHtml()}<keyword> ${toKeyword} </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}${setKeyword} ${this.assignable.renderAsSource()} ${toKeyword} ${this.expr.renderAsSource()}`;
    }
    compile(): string {
        this.compileErrors = [];
        mustBeCompatibleType(this.assignable.getOrTransformAstNode!, this.expr.getOrTransformAstNode!, this.compileErrors);

        return `${this.indent()}${this.assignable.compile()} = ${this.expr.compile()};`;
    }
} 
