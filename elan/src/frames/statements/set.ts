import { Statement } from "./statement";
import { nextId } from "../helpers";
import { Identifier } from "../text-entry/identifier";
import { Expression } from "../text-entry/expression";

export class SetStatement implements Statement {
    htmlId: string = "";
    name: Identifier = new Identifier("variableName");
    expr: Expression = new Expression("expression");

    constructor() {
        this.htmlId = `set${nextId()}`;
    }

    private cls() : string {
        return "";
    };
    
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
