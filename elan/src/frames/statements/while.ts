import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Parent} from "../interfaces/parent";
import { Field } from "../interfaces/field";

export class While extends FrameWithStatements implements Parent { 
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

    getPrefix(): string {
        return 'while';
    }

    public override selectFirstField(): boolean {
        this.condition.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>while </keyword>${this.condition.renderAsHtml()}</top>
${this.renderStatementsAsHtml()}
<keyword>end while</keyword>
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}while ${this.condition.renderAsSource()}\r
${this.renderStatementsAsSource()}\r
${this.indent()}end while`;
    }
} 
