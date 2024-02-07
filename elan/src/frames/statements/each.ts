import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Identifier } from "../fields/identifier";
import { Parent} from "../interfaces/parent";
import { File} from "../interfaces/file";
import { Field } from "../interfaces/field";

export class Each extends FrameWithStatements  {
    isStatement = true;
    variable: Identifier;
    iter: Expression;

    constructor(parent: File | Parent) {
        super(parent);
        this.multiline = true;
        this.variable = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.iter = new Expression(this);
        this.iter.setPrompt("iterable value or expression");
    }

    getFields(): Field[] {
        return [this.variable, this.iter];
    }

    getPrefix(): string {
        return 'each';
    }

    public override selectFirstField(): boolean {
        this.variable.select();
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
