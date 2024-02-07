import { Expression } from "../fields/expression";
import {Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { SelectIfClause } from "../fields/select-ifClause";
import { Field } from "../interfaces/field";


export class Else extends AbstractFrame  {
    isStatement = true;
    selectIfClause: SelectIfClause;
    hasIf: boolean = false;
    condition: Expression;

    constructor(parent: Parent) {
        super(parent);
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
        this.selectIfClause = new SelectIfClause(this);
    }

    getFields(): Field[] {
        return this.hasIf ? [this.condition] : [this.selectIfClause];
    }
    
    setIfExtension(to: boolean) {
        this.hasIf = to;
    }

    getPrefix(): string {
        return 'else';
    }

    public override selectFirstField(): boolean {
        this.condition.select();
        return true;
    }

    private ifClauseAsHtml() : string {
        return this.hasIf ? `<keyword> if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`:` ${this.selectIfClause.renderAsHtml()}`;
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
