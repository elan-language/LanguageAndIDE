import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { singleIndent } from "../helpers";
import { PlainText } from "../text-fields/plain_text";
import { Member, Role } from "./member";

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

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    isMember = true;

    currentRole(): Role {
        return Role.member;
    }

    renderAsHtml(): string {
        return `<memberSelector class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</memberSelector>`;
    }

    renderAsSource(): string {
        return `${singleIndent()}member\r\n`;
    }
} 
