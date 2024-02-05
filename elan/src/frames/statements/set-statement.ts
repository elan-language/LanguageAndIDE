import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { Field } from "../interfaces/field";

export class SetStatement extends AbstractFrame implements Statement {
    isStatement = true;
    name: Identifier;;
    expr: Expression;

    constructor(parent: ParentFrame) {
        super(parent);
        this.name = new Identifier(this);
        this.name.setPrompt("variableName");
        this.expr = new Expression(this);
    }

    getFields(): Field[] {
        return [this.name, this.expr];
    }

    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
    }
    
    getPrefix(): string {
        return 'set';
    }

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}set ${this.name.renderAsSource()} to ${this.expr.renderAsSource()}`;
    }
} 
