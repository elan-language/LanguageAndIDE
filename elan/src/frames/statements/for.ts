import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../fields/identifier";
import { Integer } from "../fields/integer";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";

export class For extends FrameWithStatements  {
    isStatement = true;
    variable: Identifier;
    from: Expression;
    to: Expression;
    step: Integer;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.variable = new Identifier(this);
        this.variable.setLabel("variableName");
        this.from = new Expression(this);
        this.from.setLabel("integer value or expression");
        this.to = new Expression(this);
        this.to.setLabel("integer value or expression");
        this.step = new Integer(this);
        this.step.setTextWithoutParsing("1");
    }

    getFields(): Field[] {
        return [this.variable, this.from, this.to, this.step];
    }

    getIdPrefix(): string {
        return 'for';
     }

    public override selectFirstField(): boolean {
        this.variable.select();
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
