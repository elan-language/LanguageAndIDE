import { Identifier } from "../fields/identifier";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { Field } from "../interfaces/field";

export class Catch extends AbstractFrame implements Statement {
    isStatement = true;
    variable: Identifier;

    constructor(parent: ParentFrame) {
        super(parent);
        this.variable  = new Identifier(this);
        this.variable.setPrompt("variableName");
        this.variable.setTextWithoutParsing("e");
    }

    getFields(): Field[] {
        return [this.variable];
    }
    
    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
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
