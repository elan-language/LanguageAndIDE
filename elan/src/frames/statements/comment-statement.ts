import { PlainText } from "../fields/plain_text";
import { Member} from "../interfaces/member";
import {Parent} from "../interfaces/parent";
import { AbstractFrame} from "../abstract-frame";

import { Field } from "../interfaces/field";

export class CommentStatement extends AbstractFrame implements Member {
    isStatement = true;
    isMember = true;
    public text: PlainText;

    constructor(parent: Parent) {
        super(parent);
        this.text= new PlainText(this);
    }

    getFields(): Field[] {
        return [this.text];
    }

    getPrefix(): string {
        return 'com';
    }

    public override selectFirstField(): boolean {
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