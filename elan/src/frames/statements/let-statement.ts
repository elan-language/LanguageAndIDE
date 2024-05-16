import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ISymbol } from "../../symbols/symbol";
import { beKeyword, letKeyword } from "../keywords";
import { VarDefField } from "../fields/var-def-field";
import { UnknownType } from "../../symbols/unknown-type";
import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../../symbols/symbol-scope";

export class LetStatement extends AbstractFrame implements Statement, ISymbol {
    isStatement = true;
    name: VarDefField;
    expr: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.name = new VarDefField(this);
        this.expr = new ExpressionField(this);
    }
    symbolType(transforms: Transforms) {
        return UnknownType.Instance;
    }
    symbolScope?: SymbolScope | undefined;
    initialKeywords(): string {
        return letKeyword;
    }
    parseFrom(source: CodeSource): void {
        source.removeIndent();
        source.remove(`${letKeyword} `);
        this.name.parseFrom(source);
        source.remove(` ${beKeyword} `);
        this.expr.parseFrom(source);
        source.removeNewLine();
    }
    getFields(): Field[] {
        return [this.name, this.expr];
    }
    getIdPrefix(): string {
        return 'let';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${letKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${beKeyword} </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}${letKeyword} ${this.name.renderAsSource()} ${beKeyword} ${this.expr.renderAsSource()}`;
    }

    compile(transforms: Transforms): string {
        this.compileErrors = [];
        return `${this.indent()}var ${this.name.compile(transforms)} = ${this.expr.compile(transforms)};`;
    }

    get symbolId() {
        return this.name.renderAsSource();
    }
} 
