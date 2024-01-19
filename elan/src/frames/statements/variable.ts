import { Statement } from "./statement";
import { Identifier } from "../text-entry/identifier";
import { Expression } from "../text-entry/expression";
import { AbstractFrame } from "../abstract-frame";

export class Variable extends AbstractFrame implements Statement {
    htmlId: string = "";
    name: Identifier = new Identifier("name");
    expr: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `var${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>var </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
