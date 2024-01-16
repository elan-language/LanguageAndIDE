import { Statement } from "./statement";
import { nextId } from "./helpers";
import { TextEntry } from "./textEntry";
import { Identifier } from "./identifier";
import { Expression } from "./expression";
import { Global } from "./global";

export class Constant implements Global {
    htmlId: string = "";
    name: Identifier = new Identifier("name");
    expr: Expression = new Expression("literal value");

    constructor() {
        this.htmlId = `const${nextId()}`;
    }

    renderAsHtml(): string {
        return `<global id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</global>`;
    }
} 
