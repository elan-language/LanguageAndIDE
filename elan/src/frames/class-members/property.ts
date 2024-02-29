import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { CodeSource } from "../code-source";
import { Identifier } from "../fields/identifier";
import { Type } from "../fields/type";
import { Class } from "../globals/class";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";

export class Property extends AbstractFrame implements Member {
    isMember = true;
    name: Identifier;
    type: Type;
    public private: boolean = false;
    private class: Class;

    constructor(parent: Class) {
        super(parent);
        this.class = parent as Class;
        this.name = new Identifier(this);
        this.type = new Type(this);
    }

    getFields(): Field[] {
        return [this.name, this.type];
    }

    getIdPrefix(): string {
        return 'prop';
    }
    private modifierAsHtml(): string {
        return this.private ? `<keyword>private </keyword>`: "";
    }
    private modifierAsSource(): string {
        return this.private ? `private `: "";
    }

    renderAsHtml(): string {
        return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.modifierAsHtml()}<keyword>property </keyword>${this.name.renderAsHtml()}<keyword> </keyword>${this.type.renderAsHtml()}</property>`;
    }

    renderAsSource(): string {
        return `${this.indent()}${this.modifierAsSource()}property ${this.name.renderAsSource()} ${this.type.renderAsSource()}\r\n`;
    }

    parseFrom(source: CodeSource): void {
        var priv = "private ";
        if (source.isMatch(priv)) {
            source.remove(priv);
            this.private = true;
        }
        source.remove("property ");
        this.name.parseFrom(source);
        source.remove(" ");
        this.type.parseFrom(source);
    }
    insertSelector(after: boolean): void {
        this.class.insertMemberSelector(after, this);
    }
} 
