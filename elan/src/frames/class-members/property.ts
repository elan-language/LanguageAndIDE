import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { Identifier } from "../text-fields/identifier";
import { Type } from "../text-fields/type";
import { Member } from "./member";

export class Property extends AbstractFrame implements Member {
    name: Identifier = new Identifier("name");
    type: Type = new Type("Type");
    public private: boolean = false;

    constructor() {
        super();
        this.htmlId = `prop${this.nextId()}`;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.name.initialize(frameMap, this);
        this.type.initialize(frameMap, this);
    }

    private modifier(): string {
        return this.private ? `<keyword>private </keyword>`: "";
    }

    renderAsHtml(): string {
        return `<property class="" id='${this.htmlId}' tabindex="0">${this.modifier()}<keyword>property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</property>`;
    }
} 
