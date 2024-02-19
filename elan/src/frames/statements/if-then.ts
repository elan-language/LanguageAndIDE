import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Condition } from "../fields/condition";

export class IfThen extends FrameWithStatements{
    isStatement = true;
    condition: Condition;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new Condition(this);
        this.condition.setPlaceholder("condition");
    }

    getFields(): Field[] {
        return [this.condition];
    }

    public override selectFirstField(): boolean {
        this.condition.select();
        return true;
    }

    getIdPrefix(): string {
        return 'if';
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>if </keyword>${this.condition.renderAsHtml()}<keyword> then </keyword></top>
${this.renderStatementsAsHtml()}
<keyword>end if</keyword>
</statement>`;
    }
    renderAsSource(): string {
    return `${this.indent()}if ${this.condition.renderAsSource()} then\r
${this.renderStatementsAsSource()}\r
${this.indent()}end if`;
    }
    parseTopOfFrame(source: CodeSource): void {
        source.remove("if ");
        this.condition.parseFrom(source);
        source.remove(" then");
    }
    parseBottomOfFrame(source: CodeSource): boolean {
        return this.parseStandardEnding(source, "end if");
    }
} 
