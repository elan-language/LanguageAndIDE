import { Statement } from "./statement";
import { CodeFrame } from "../code-frame";
import { PlainText } from "../text-fields/plain_text";
import { Frame } from "../frame";
import { Member} from "../class-members/member";
import {Parent} from "../parent";

export class CommentStatement extends CodeFrame implements Statement, Member {
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