import { IdentifierField } from "../fields/identifier-field";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ValueRefField } from "../fields/value-ref-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { forKeyword } from "../keywords";

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
        this.from = new ValueRefField(this);
        this.to = new ValueRefField(this);
        this.step = new ValueRefField(this);
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
<top><expand>+</expand><keyword>for </keyword>${this.variable.renderAsHtml()}<keyword> from </keyword>${this.from.renderAsHtml()}<keyword> to </keyword>${this.to.renderAsHtml()}<keyword> step </keyword>${this.step.renderAsHtml()}</top>
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
        const s = this.step.compile();
        return `${this.indent()}for (var ${v} = ${f}; ${v} <= ${t}; ${v} = ${v} + ${s}) {\r
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
} 
