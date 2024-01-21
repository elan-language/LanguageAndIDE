
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { Global } from "./global";
import { AbstractFrame } from "../abstract-frame";

export class Constant extends AbstractFrame implements Global {

    name: Identifier = new Identifier("name");
    expr: Expression = new Expression("literal value");

    constructor() {
        super();
        this.htmlId = `const${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</constant>`;
    }
} 
