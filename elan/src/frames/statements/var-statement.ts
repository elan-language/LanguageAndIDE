import { ExpressionField } from "../fields/expression-field";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { VarDefField as VarDefField } from "../fields/var-def-field";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { setKeyword, toKeyword, varKeyword } from "../keywords";
import { mustNotBeReassigned } from "../compile-rules";
import { Frame } from "../interfaces/frame";

export class VarStatement extends AbstractFrame implements Statement, ISymbol  {
    isStatement = true;
    name: VarDefField;
    expr: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.name = new VarDefField(this);
        this.expr = new ExpressionField(this);
    }
    initialKeywords(): string {
        return varKeyword;
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

   renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${varKeyword} </keyword>${this.name.renderAsHtml()}<keyword> ${setKeyword} ${toKeyword} </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}${varKeyword} ${this.name.renderAsSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsSource()}`;
    }

    compile(): string {
        this.compileErrors = [];
        const id = this.name.getOrTransformAstNode?.compile();
        const symbol = this.getParent().resolveSymbol(id!, this);

        mustNotBeReassigned(symbol, this.compileErrors, this.name.getHtmlId());
        
        return `${this.indent()}var ${id} = ${this.expr.compile()};`;
    }

    get symbolId() {
        return this.name.renderAsSource();
    }

    get symbolType() {
        return this.expr.symbolType;
    }

    symbolScope = SymbolScope.local;

    resolveSymbol(id: string | undefined, initialScope: Frame): ISymbol {
        if (id === this.symbolId) {
            return this;
        }

        return super.resolveSymbol(id, initialScope);
    }
} 
