import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { Identifier } from "../fields/identifier";
import { Type } from "../fields/type";
import { Class } from "../globals/class";
import { Field } from "../interfaces/field";
import { Member } from "../interfaces/member";

export class AbstractProperty extends AbstractFrame implements Member {
    isAbstract = true;
    isMember = true;
    name: Identifier;
    type: Type;
    public private: boolean = false;

    constructor(parent: Class) {
        super(parent);
        this.name = new Identifier(this);
        this.type = new Type(this);
    }

    getFields(): Field[] {
        return [this.name, this.type];
    }

    getIdPrefix(): string {
        return 'prop';
    }

    public override selectFirstFieldOrSuitableFrameIfNone(): boolean {
        this.name.select();
        return true;
    }

    renderAsHtml(): string {
        return `<property class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>abstract property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</property>`;
    }

    renderAsSource(): string {
        return `${this.indent()}abstract property ${this.name.renderAsSource()} ${this.type.renderAsSource()}\r\n`;
    }

    parseFrom(source: CodeSource): void {
        source.remove("abstract property ");
        this.name.parseFrom(source);
        source.remove(" ");
        this.type.parseFrom(source);
    }
} 
