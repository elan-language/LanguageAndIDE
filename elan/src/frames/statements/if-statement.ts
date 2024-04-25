import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Statement } from "../interfaces/statement";
import { mustBeOfType } from "../compile-rules";
import { BooleanType } from "../../symbols/boolean-type";

export class IfStatement extends FrameWithStatements implements Statement {
    isStatement = true;
    condition: ExpressionField;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new ExpressionField(this);
        this.condition.setPlaceholder("condition");
    }

    getFields(): Field[] {
        return [this.condition];
    }
    getIdPrefix(): string {
        return 'if';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>if </keyword>${this.condition.renderAsHtml()}</top>
${this.renderChildrenAsHtml()}
<keyword>end if</keyword>
</statement>`;
    }
    renderAsSource(): string {
    return `${this.indent()}if ${this.condition.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end if`;
    }

    compile(): string {
        mustBeOfType(this.condition.getOrTransformAstNode, BooleanType.Instance, this.compileErrors);

        return `${this.indent()}if (${this.condition.compile()}) {\r
${this.renderStatementsAsObjectCode()}\r
${this.indent()}}`;
    }

    
    parseTop(source: CodeSource): void {
        source.remove("if ");
        this.condition.parseFrom(source);
    }
    parseBottom(source: CodeSource): boolean {
        source.removeIndent();
        return this.parseStandardEnding(source, "end if");
    }
} 
