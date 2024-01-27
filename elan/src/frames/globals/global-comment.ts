import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { PlainText } from "../text-fields/plain_text";
import { Global } from "./global";

export class GlobalComment extends AbstractFrame implements Global {
    getPrefix(): string {
        return 'com';
    }

    public text: PlainText;

    constructor(parent: Frame) {
        super(parent);
        this.text = new PlainText(this);
    }

    isGlobal = true;

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    renderAsHtml(): string {
        return `<comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return `# ${this.text.renderAsSource()}`;
    }
} 