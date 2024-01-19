import { Statement } from "./statement";
import { Expression } from "../text-entry/expression";
import { AbstractFrame } from "../abstract-frame";

export class Print extends AbstractFrame implements Statement {
    expr: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `print${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>print </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
