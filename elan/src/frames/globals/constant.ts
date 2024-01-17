import { nextId } from "../helpers";
import { Identifier } from "../text-entry-fields/identifier";
import { Expression } from "../text-entry-fields/expression";
import { Global } from "./global";

export class Constant implements Global {
    htmlId: string = "";
    name: Identifier = new Identifier();
    expr: Expression = new Expression("literal value");
    private cls : string ="";

    constructor() {
        this.htmlId = `const${nextId()}`;
    }

    renderAsHtml(): string {
        return `<constant class="${this.cls}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</constant>`;
    }
} 
