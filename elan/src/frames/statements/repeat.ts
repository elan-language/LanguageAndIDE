import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { repeatKeyword } from "../keywords";

export class Repeat extends FrameWithStatements implements Statement {
    isStatement: boolean = true;
    condition: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new ExpressionField(this);
        this.condition.setPlaceholder("condition");
    }
    initialKeywords(): string {
        return repeatKeyword;
    }
    getFields(): Field[] {
        return [this.condition];
    }

    getIdPrefix(): string {
        return 'repeat';
    }
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>repeat</keyword></top>
${this.renderChildrenAsHtml()}
<keyword>end repeat when </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }
    renderAsSource(): string {
        return `${this.indent()}repeat\r
${this.renderChildrenAsSource()}\r
${this.indent()}end repeat when ${this.condition.renderAsSource()}`;
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.indent()}do {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}} while (!(${this.condition.compile()}));`;
    }

    parseTop(source: CodeSource): void {
        source.remove("repeat");
    }
    parseBottom(source: CodeSource): boolean {
        var result = false;
        if (this.parseStandardEnding(source, "end repeat when ")) {
            this.condition.parseFrom(source);
            result = true;
        }
        return result;
    }
} 
