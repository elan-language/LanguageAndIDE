import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Expression } from "../text-entry/expression";

export class Print implements Statement {
    htmlId: string = "";
    expr: Expression = new Expression("expression");

    constructor() {
        this.htmlId = `print${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>print </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
