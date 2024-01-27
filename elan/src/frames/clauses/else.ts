
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { Statement } from "../statements/statement";
import { Expression } from "../text-fields/expression";

export class Else extends AbstractFrame implements Statement {
    getPrefix(): string {
        return 'else';
    }
    hasIf: boolean = false;
    condition: Expression;

    constructor(parent: Frame) {
        super(parent);
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
    }

    public override selectFirstText(): boolean {
        this.condition.select(true);
        return true;
    }

    private ifClauseAsHtml() : string {
        return this.hasIf ? `<keyword> if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`:"";
    }

    private ifClauseAsSource() : string {
        return this.hasIf ? ` if ${this.condition.renderAsSource()} then`:``;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<clause class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>else</keyword>${this.ifClauseAsHtml()}</clause>`;
    }

    indent(): string {
        return this.getParent()?.indent()+""; //No additonal indent for an else clause
    }

    renderAsSource(): string {
        return `${this.indent()}else${this.ifClauseAsSource()}`;
    }

} 
