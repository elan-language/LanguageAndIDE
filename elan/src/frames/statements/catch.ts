import { Identifier } from "../fields/identifier";
import {ParentFrame} from "../interfaces/parent-frame";
import { SingleLineStatement } from "../single-line-statement";

export class Catch extends SingleLineStatement {
    isStatement = true;
    variable: Identifier;

    constructor(parent: ParentFrame) {
        super(parent);
        this.variable  = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.variable.setTextWithoutParsing("e");
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
