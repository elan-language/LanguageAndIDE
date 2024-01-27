import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { Identifier } from "../text-fields/identifier";
import { Type } from "../text-fields/type";
import { Member } from "./member";

export class Property extends AbstractFrame implements Member {
    name: Identifier;
    type: Type;
    public private: boolean = false;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `prop${this.nextId()}`;
        this.name = new Identifier(this);
        this.type = new Type(this);
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent as Frame);
        this.name.initialize(frameMap, this);
        this.type.initialize(frameMap, this);
    }

    isMember = true;

    public override selectFirstText(): boolean {
        this.name.select(true);
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
