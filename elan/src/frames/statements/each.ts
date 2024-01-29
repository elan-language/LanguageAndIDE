import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../text-fields/identifier";
import { Frame } from "../frame";

export class Each extends FrameWithStatements implements Statement {
    isStatement = true;
    variable: Identifier;
    iter: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.multiline = true;
        this.variable = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.iter = new Expression(this);
        this.iter.setPrompt("iterable value or expression");
    }

    getPrefix(): string {
        return 'each';
    }

    public override selectFirstText(): boolean {
        this.variable.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>each </keyword>${this.variable.renderAsHtml()}<keyword> in </keyword>${this.iter.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end each</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}each ${this.variable.renderAsSource()} in ${this.iter.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end each`;
    }
} 
