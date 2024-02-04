import { Statement } from "./statement";
import { Expression } from "../fields/expression";
import { FrameWithStatements } from "../frame-with-statements";
import { Selectable } from "../selectable";
import {Parent} from "../parent";

export class Repeat extends FrameWithStatements implements Statement {
    isStatement = true;
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.multiline = true;
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
    }

    getPrefix(): string {
        return 'repeat';
    }

    public override selectFirstText(): boolean {
        this.condition.select();
        return true;
    }
    
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>repeat</keyword></top>
${this.renderStatementsAsHtml()}
<keyword>until </keyword>${this.condition.renderAsHtml()}
</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}repeat\r
${this.renderStatementsAsSource()}\r
${this.indent()}until ${this.condition.renderAsSource()}`;
    }
} 
