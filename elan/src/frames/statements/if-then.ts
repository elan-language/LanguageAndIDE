
import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import {Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";

export class IfThen extends FrameWithStatements{
    isStatement = true;
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
    }

    getFields(): Field[] {
        return [this.condition];
    }

    public override selectFirstText(): boolean {
        this.condition.select();
        return true;
    }

    getPrefix(): string {
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
} 
