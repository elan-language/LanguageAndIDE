import { AbstractFrame } from "../abstract-frame";

import { PlainText } from "../text-entry/plain_text";
import { Member } from "./member";

export class MemberSelector extends AbstractFrame implements Member {
    text: PlainText = new PlainText("member");

    constructor() {
        super();
        this.htmlId = `memberSelect${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<memberSelector class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</memberSelector>`;
    }
} 
