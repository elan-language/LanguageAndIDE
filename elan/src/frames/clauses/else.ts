
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../statements/statement";
import { Expression } from "../text-fields/expression";

export class Else extends AbstractFrame implements Statement {
    hasIf: boolean = false;
    condition: Expression = new Expression("condition");

    constructor() {
        super();
        this.htmlId = `else${this.nextId()}`;
    }

    private ifClause() : string {
        return this.hasIf ? `<keyword> if </keyword>${this.condition.renderAsHtml()}<keyword> then</keyword>`:"";
    }

    renderAsHtml(): string {
        return `<clause class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>else</keyword>${this.ifClause()}</clause>`;
    }
} 
