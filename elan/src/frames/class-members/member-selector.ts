import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { PlainText } from "../text-fields/plain_text";
import { Member } from "./member";

export class MemberSelector extends AbstractFrame implements Member {
    text: PlainText = new PlainText("member");

    constructor() {
        super();
        this.htmlId = `memberSelect${this.nextId()}`;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    isMember = true;

    renderAsHtml(): string {
        return `<memberSelector class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</memberSelector>`;
    }

    renderAsSource(): string {
        return ``;
    }
} 
