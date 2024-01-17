import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Expression } from "../text-entry-fields/expression";

export class ReturnStatement implements Statement {
    htmlId: string = "";
    expr: Expression = new Expression("expression");

    constructor() {
        this.htmlId = `return${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>return </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
