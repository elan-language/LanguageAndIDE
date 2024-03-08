import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Expression } from "../fields/expression";
import { MultiLineStatement } from "./multi-line-statement";

export class IfStatement extends MultiLineStatement{
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new Expression(this);
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
    parseTopOfFrame(source: CodeSource): void {
        source.remove("if ");
        this.condition.parseFrom(source);
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        source.removeIndent();
        return this.parseStandardEnding(source, "end if");
    }
} 
