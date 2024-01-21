import { AbstractFrame } from "../abstract-frame";

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

    private modifier(): string {
        return this.private ? `<keyword>private </keyword>`: "";
    }

    renderAsHtml(): string {
        return `<property class="" id='${this.htmlId}' tabindex="0">${this.modifier()}<keyword>property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</property>`;
    }
} 
