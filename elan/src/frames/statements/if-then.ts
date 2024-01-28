import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Frame } from "../frame";

export class IfThen extends FrameWithStatements implements Statement {
    isStatement = true;
    condition: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.multiline = true;
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
    }

    public override selectFirstText(): boolean {
        this.condition.select(true);
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
