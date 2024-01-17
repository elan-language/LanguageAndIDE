import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Identifier } from "../text-entries/identifier";
import { Expression } from "../text-entries/expression";

export class SetStatement implements Statement {
    htmlId: string = "";
    name: Identifier = new Identifier("name");
    expr: Expression = new Expression("expression");

    constructor() {
        this.htmlId = `set${nextId()}`;
    }

    renderAsHtml(): string {
        return `<statement id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
