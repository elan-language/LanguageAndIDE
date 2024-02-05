import { Expression } from "../fields/expression";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { SelectIfClause } from "../fields/select-ifClause";


export class Else extends AbstractFrame implements Statement {
    isStatement = true;
    ifClause: SelectIfClause;
    hasIf: boolean = false;
    condition: Expression;

    constructor(parent: ParentFrame) {
        super(parent);
        this.condition = new Expression(this);
        this.condition.setPrompt("condition");
        this.ifClause = new SelectIfClause(this);
    }
    
    setIfExtension(to: boolean) {
        this.hasIf = to;
    }
    
    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }

    getPrefix(): string {
        return 'else';
    }

    public override selectFirstText(): boolean {
        this.condition.select();
        return true;
    }

    private ifClauseAsHtml() : string {
        return this.hasIf ? `<keyword> if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`:`${this.ifClause}`;
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
