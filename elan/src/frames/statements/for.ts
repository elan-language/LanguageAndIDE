import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-fields/identifier";
import { Integer } from "../text-fields/integer";
import { Frame } from "../frame";

export class For extends FrameWithStatements implements Statement {
    isStatement = true;
    variable: Identifier;
    from: Expression;
    to: Expression;
    step: Integer;

    constructor(parent: Frame) {
        super(parent);
        this.multiline = true;
        this.variable = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.from = new Expression(this);
        this.from.setPrompt("integer value or expression");
        this.to = new Expression(this);
        this.to.setPrompt("integer value or expression");
        this.step = new Integer(this);
        this.step.enterText("1");
    }

    getPrefix(): string {
        return 'for';
     }

    public override selectFirstText(): boolean {
        this.variable.select(true, false);
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>for </keyword>${this.variable.renderAsHtml()}<keyword> from </keyword>${this.from.renderAsHtml()}<keyword> to </keyword>${this.to.renderAsHtml()}<keyword> step </keyword>${this.step.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end for</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}for ${this.variable.renderAsSource()} from ${this.from.renderAsSource()} to ${this.to.renderAsSource()} step ${this.step.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end for`;
    }
} 
