import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { Statement } from "../statements/statement";
import { Identifier } from "../text-fields/identifier";

export class Catch extends AbstractFrame implements Statement {
    getPrefix(): string {
        return 'catch';
    }
    variable: Identifier;

    constructor(parent: Frame) {
        super(parent);
        this.variable  = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.variable.enterText("e");
    }

    public override selectFirstText(): boolean {
        this.variable.select(true);
        return true;
    }

    isStatement = true;

    renderAsHtml(): string {
        return `<clause class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>catch </keyword>${this.variable.renderAsHtml()}</clause>`;
    }

    indent(): string {
        return this.getParent()?.indent()+""; //No additonal indent for a catch clause
    }

    renderAsSource(): string {
        return `${this.indent()}catch ${this.variable.renderAsSource()}`;
    }
} 
