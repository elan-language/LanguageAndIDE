import { IdentifierField } from "../fields/identifier-field";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ValueRefField } from "../fields/value-ref-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { forKeyword } from "../keywords";
import { Frame } from "../interfaces/frame";
import { ISymbol, SymbolScope } from "../../symbols/symbol";
import { mustBeOfSymbolType } from "../compile-rules";
import { IntType } from "../../symbols/int-type";

export class For extends FrameWithStatements implements Statement  {
    isStatement: boolean = true;
    variable: IdentifierField;
    from: ValueRefField;
    to: ValueRefField;
    step: ValueRefField;

    constructor(parent: Parent) {
        super(parent);
        this.variable = new IdentifierField(this);
        this.variable.setPlaceholder("variableName");
        this.from = new ValueRefField(this, / to /);
        this.to = new ValueRefField(this, / step /);
        this.step = new ValueRefField(this, /\r|\n/);
        this.step.setText("1");
    }

    initialKeywords(): string {
        return forKeyword;
    }

    getFields(): Field[] {
        return [this.variable, this.from, this.to, this.step];
    }

    getIdPrefix(): string {
        return 'for';
     }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>for </keyword>${this.variable.renderAsHtml()}<keyword> from </keyword>${this.from.renderAsHtml()}<keyword> to </keyword>${this.to.renderAsHtml()}<keyword> step </keyword>${this.step.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end for</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}for ${this.variable.renderAsSource()} from ${this.from.renderAsSource()} to ${this.to.renderAsSource()} step ${this.step.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end for`;
    }

    compile(): string {
        this.compileErrors = [];
        const v = this.variable.compile();
        const f = this.from.compile();
        const t = this.to.compile();
        var s = this.step.compile();

        mustBeOfSymbolType(this.from.symbolType, IntType.Instance, this.compileErrors, this.htmlId );
        mustBeOfSymbolType(this.to.symbolType, IntType.Instance, this.compileErrors, this.htmlId );
        mustBeOfSymbolType(this.step.symbolType, IntType.Instance, this.compileErrors, this.htmlId );

        var compare = "<=";
        var incDec = "+";

        if (s.startsWith("-")){
            compare = ">=";
            incDec = "-";
            s = s.slice(1);
        }

        return `${this.indent()}for (var ${v} = ${f}; ${v} ${compare} ${t}; ${v} = ${v} ${incDec} ${s}) {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}}`;
    }

    parseTop(source: CodeSource): void {
        source.remove("for ");
        this.variable.parseFrom(source);
        source.remove(" from ");
        this.from.parseFrom(source);
        source.remove(" to ");
        this.to.parseFrom(source);
        source.remove(" step ");
        this.step.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end for");
    }

    resolveSymbol(id: string | undefined, initialScope : Frame): ISymbol {
        const v = this.variable.text;
        
        if (id === v) {
            const st = this.from.symbolType;
            return {
                symbolId: id,
                symbolType: st,
                symbolScope: SymbolScope.counter
            };
        }

        return super.resolveSymbol(id, this);
    }
} 
