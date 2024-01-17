import { nextId } from "../helpers";
import { PlainText } from "../text-entry-fields/plain_text";
import { Member } from "./member";

export class MemberSelector implements Member {
    htmlId: string = "";
    text: PlainText = new PlainText("member");

    constructor() {
        this.htmlId = `memberSelect${nextId()}`;
    }

    renderAsHtml(): string {
        return `<member id='${this.htmlId}' tabindex="0"><keyword>${this.text.renderAsHtml()}</keyword></statement>`;
    }
} 
