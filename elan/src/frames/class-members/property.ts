import { AbstractFrame } from "../abstract-frame";
import { Renderable } from "../frame";
import { Identifier } from "../fields/identifier";
import { Type } from "../fields/type";
import { Member } from "./member";
import {Parent} from "../parent";
import { TextFieldHolder } from "../TextFieldHolder";

export class Property extends AbstractFrame implements Member, TextFieldHolder {
    isMember = true;
    name: Identifier;
    type: Type;
    public private: boolean = false;

    constructor(parent: Parent) {
        super(parent);
        this.name = new Identifier(this);
        this.type = new Type(this);
    }

    getPrefix(): string {
        return 'prop';
    }

    public override selectFirstText(): boolean {
        this.name.select();
        return true;
    }

    private modifierAsHtml(): string {
        return this.private ? `<keyword>private </keyword>`: "";
    }
    private modifierAsSource(): string {
        return this.private ? `private `: "";
    }

    renderAsHtml(): string {
        return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.modifierAsHtml()}<keyword>property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</property>`;
    }

    renderAsSource(): string {
        return `${this.indent()}${this.modifierAsSource()}property ${this.name.renderAsSource()} ${this.type.renderAsSource()}\r\n`;
    }
} 
