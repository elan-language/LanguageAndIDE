
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../statements/statement";
import { Expression } from "../fields/expression";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class Else extends AbstractFrame implements Statement, TextFieldHolder {
    isStatement = true;
    hasIf: boolean = false;
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
    }

    getPrefix(): string {
        return 'else';
    }

    public override selectFirstText(): boolean {
        this.condition.select();
        return true;
    }

    private ifClauseAsHtml() : string {
        return this.hasIf ? `<keyword> if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`:"";
    }

    private ifClauseAsSource() : string {
        return this.hasIf ? ` if ${this.condition.renderAsSource()} then`:``;
    }

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
