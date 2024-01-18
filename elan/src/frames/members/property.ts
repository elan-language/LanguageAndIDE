import { nextId } from "../helpers";
import { Identifier } from "../text-entry/identifier";
import { Type } from "../text-entry/type";
import { Member } from "./member";

export class Property implements Member {
    htmlId: string = "";
    name: Identifier = new Identifier("name");
    type: Type = new Type("Type");
    public private: boolean = false;

    constructor() {
        this.htmlId = `prop${nextId()}`;
    }

    private modifier(): string {
        return this.private ? `<keyword>private </keyword>`: "";
    }

    renderAsHtml(): string {
        return `<property class="" id='${this.htmlId}' tabindex="0">${this.modifier()}<keyword>property </keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</property>`;
    }
} 
