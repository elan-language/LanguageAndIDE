import { Statement } from "./statement";
import { Identifier } from "../text-entry/identifier";
import { Expression } from "../text-entry/expression";
import { AbstractFrame } from "../abstract-frame";

export class SetStatement extends AbstractFrame implements Statement {
    name: Identifier = new Identifier("variableName");
    expr: Expression = new Expression("expression");

    constructor() {
        super();
        this.htmlId = `set${this.nextId()}`;
    }
    
    renderAsHtml(): string {
        return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>set </keyword>${this.name.renderAsHtml()}<keyword> to </keyword>${this.expr.renderAsHtml()}</statement>`;
    }
} 
