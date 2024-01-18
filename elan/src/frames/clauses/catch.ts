import { nextId } from "../helpers";
import { Statement } from "../statements/statement";
import { Identifier } from "../text-entry-fields/identifier";

export class Catch implements Statement {
    htmlId: string = "";
    variable: Identifier = new Identifier("variableName");

    constructor() {
        this.htmlId = `catch${nextId()}`;
        this.variable.enterText("e");
    }

    private cls() : string {
        return "";
    };

    renderAsHtml(): string {
        return `<clause class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>catch </keyword>${this.variable.renderAsHtml()}</clause>`;
    }
} 
