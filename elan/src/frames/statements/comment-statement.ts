import { Statement } from "./statement";
import { Member } from "../class-members/member";
import { nlS } from "../helpers";
import { AbstractFrame } from "../abstract-frame";
import { PlainText } from "../text-fields/plain_text";
import { Frame } from "../frame";

export class CommentStatement extends AbstractFrame implements Statement, Member {

    public text: PlainText = new PlainText("");

    constructor() {
        super();
        this.htmlId = `com${this.nextId()}`;
    }
    isStatement = true;
    isMember = true;

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    renderAsHtml(): string {
        return `<statement><comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment></statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}${this.text.renderAsSource()}`;
    }
} 
