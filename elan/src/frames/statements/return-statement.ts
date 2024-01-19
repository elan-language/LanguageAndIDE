import { Statement } from "./statement";
import { Expression } from "../text-entry/expression";
import { AbstractFrame } from "../abstract-frame";

export class ReturnStatement extends AbstractFrame implements Statement {
    expr: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `return${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
