import { Statement } from "./statement";
import { Expression } from "../text-fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Renderable } from "../frame";
import {Parent} from "../parent";

export class While extends FrameWithStatements implements Statement { 
    isStatement = true;
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
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
