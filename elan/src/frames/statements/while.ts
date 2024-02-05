import { Statement } from "../interfaces/statement";
import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import {ParentFrame} from "../interfaces/parent-frame";
import { Field } from "../interfaces/field";

export class While extends FrameWithStatements implements Statement, ParentFrame { 
    isStatement = true;
    condition: Expression;

    constructor(parent: ParentFrame) {
        super(parent);
        this.multiline = true;
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
    }

    getFields(): Field[] {
        return [this.condition];
    }

    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }

    getPrefix(): string {
        return 'while';
    }

    public override selectFirstText(): boolean {
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
