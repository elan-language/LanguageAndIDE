import { Identifier } from "../fields/identifier";
import { Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";

export class Catch extends AbstractFrame {
    isStatement = true;
    variable: Identifier;

    constructor(parent: Parent) {
        super(parent);
        this.variable  = new Identifier(this);
        this.variable.setPlaceholder("variableName");
        this.variable.setTextWithoutParsing("e");
    }
    getFields(): Field[] {
        return [this.variable];
    }
    
    getIdPrefix(): string {
        return 'catch';
    }

    public override selectFirstField(): boolean {
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
