import { Statement } from "./statement";
import { AbstractFrame } from "../abstract-frame";
import { PlainText } from "../text-fields/plain_text";
import { Frame } from "../frame";
import { Member} from "../class-members/member";

export class CommentStatement extends AbstractFrame implements Statement, Member {

    public text: PlainText;

    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `com${this.nextId()}`;
        this.text= new PlainText(this);
    }
    isStatement = true;
    isMember = true;

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    renderAsHtml(): string {
        return `<statement><comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment></statement>`;
    }

    renderAsSource(): string {
        return `${this.indent()}# ${this.text.renderAsSource()}`;
    }
}