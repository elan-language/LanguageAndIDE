import { nextId } from "../helpers";
import { Identifier } from "../text-entry-fields/identifier";
import { PlainText } from "../text-entry-fields/plain_text";
import { Type } from "../text-entry-fields/type";
import { Member } from "./member";

export class Property implements Member {
    htmlId: string = "";
    name: Identifier = new Identifier();
    type: Type = new Type("Type");

    constructor() {
        this.htmlId = `prop${nextId()}`;
    }

    renderAsHtml(): string {
        return `<member id='${this.htmlId}' tabindex="0"><keyword>property >/keyword>${this.name.renderAsHtml()} ${this.type.renderAsHtml()}</member>`;
    }
} 
