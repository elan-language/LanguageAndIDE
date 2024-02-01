import { Statement } from "./statement";
import { AbstractFrame } from "../abstract-frame";
import { PlainText } from "../text-fields/plain_text";
import { Frame } from "../frame";
import { Member} from "../class-members/member";
import {Parent} from "../parent";

export class CommentStatement extends AbstractFrame implements Statement, Member {
    isStatement = true;
    isMember = true;
    public text: PlainText;

    constructor(parent: Parent) {
        super(parent);
        this.text= new PlainText(this);
    }

    getPrefix(): string {
        return 'com';
    }

    public override selectFirstText(): boolean {
        this.text.select();
        return true;
    }

    renderAsHtml(): string {
        return `<statement><comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment></statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}# ${this.text.renderAsSource()}`;
    }
}