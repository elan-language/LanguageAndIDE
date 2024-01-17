import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Identifier } from "../text-entry-fields/identifier";
import { Expression } from "../text-entry-fields/expression";

export class Variable implements Statement {
    htmlId: string = "";
    name: Identifier = new Identifier("name");
    expr: Expression = new Expression("expression");

    constructor() {
        this.htmlId = `var${nextId()}`;
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>var </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
