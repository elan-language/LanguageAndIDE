
import { Identifier } from "../text-fields/identifier";
import { Expression } from "../text-fields/expression";
import { Global } from "./global";
import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";

export class Constant extends AbstractFrame implements Global {
    getPrefix(): string {
        return 'const';
    }

    name: Identifier;
    expr: Expression;


    constructor(parent: Frame) {
        super(parent);
        this.name  = new Identifier(this);
        this.expr = new Expression(this);
        this.expr.setPrompt("literal value");
    }

    isGlobal = true;

    public override selectFirstText(): boolean {
        this.name.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<constant class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>constant </keyword>${this.name.renderAsHtml()}<keyword> set to </keyword>${this.expr.renderAsHtml()}</constant>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return `constant ${this.name.renderAsSource()} set to ${this.expr.renderAsSource()}\r
`;
    }
} 
