import { AbstractFrame } from "../abstract-frame";
import { Renderable } from "../frame";
import { PlainText } from "../fields/plain_text";
import { Global } from "./global";
import {Parent} from "../parent";

export class GlobalComment extends AbstractFrame implements Global {
    isGlobal = true;
    public text: PlainText;

    constructor(parent: Parent) {
        super(parent);
        this.text = new PlainText(this);
        this.text.setPrompt("comment");
    }

    getPrefix(): string {
        return 'com';
    }

    public override selectFirstText(): boolean {
        this.text.select();
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