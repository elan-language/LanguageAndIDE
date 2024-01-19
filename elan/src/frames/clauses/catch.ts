import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../statements/statement";
import { Identifier } from "../text-entry/identifier";

export class Catch extends AbstractFrame implements Statement {
    variable: Identifier = new Identifier("variableName");

    constructor() {
        super();
        this.htmlId = `catch${this.nextId()}`;
        this.variable.enterText("e");
    }

    renderAsHtml(): string {
        return `<clause class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>catch </keyword>${this.variable.renderAsHtml()}</clause>`;
    }
} 
