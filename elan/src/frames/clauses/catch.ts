import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../statements/statement";
import { Identifier } from "../fields/identifier";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class Catch extends AbstractFrame implements Statement, TextFieldHolder {
    isStatement = true;
    variable: Identifier;

    constructor(parent: Parent) {
        super(parent);
        this.variable  = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.variable.enterText("e");
    }

    getPrefix(): string {
        return 'catch';
    }

    public override selectFirstText(): boolean {
        this.variable.select();
        return true;
    }

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
