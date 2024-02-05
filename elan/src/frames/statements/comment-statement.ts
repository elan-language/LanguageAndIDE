import { PlainText } from "../fields/plain_text";
import { Member} from "../interfaces/member";
import {ParentFrame} from "../interfaces/parent-frame";
import { SingleLineStatement } from "../single-line-statement";

export class CommentStatement extends SingleLineStatement implements Member {
    isStatement = true;
    isMember = true;
    public text: PlainText;

    constructor(parent: ParentFrame) {
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