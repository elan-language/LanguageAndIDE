import { PlainText } from "../fields/plain_text";
import { Member} from "../interfaces/member";
import {ParentFrame} from "../interfaces/parent-frame";
import { AbstractFrame} from "../abstract-frame";
import { Statement } from "../interfaces/statement";

export class CommentStatement extends AbstractFrame implements Statement, Member {
    isStatement = true;
    isMember = true;
    public text: PlainText;

    constructor(parent: ParentFrame) {
        super(parent);
        this.text= new PlainText(this);
    }
    
    getParentFrame(): ParentFrame {
        return this.getParent() as ParentFrame;
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