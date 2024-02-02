
import { Identifier } from "../fields/identifier";
import { Expression } from "../fields/expression";
import { Global } from "./global";
import { AbstractFrame } from "../abstract-frame";
import { Renderable } from "../frame";
import {Parent} from "../parent";

export class Constant extends AbstractFrame implements Global {
    isGlobal = true;
    name: Identifier;
    expr: Expression;


    constructor(parent: Parent) {
        super(parent);
        this.name  = new Identifier(this);
        this.expr = new Expression(this);
        this.expr.setPrompt("literal value");
    }

    getPrefix(): string {
        return 'const';
    }

    public override selectFirstText(): boolean {
        this.name.select();
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
