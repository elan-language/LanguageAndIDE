import { CodeFrame } from "../code-frame";
import { Frame } from "../frame";
import { PlainText } from "../text-fields/plain_text";
import { Global } from "./global";
import {Parent} from "../parent";

export class GlobalComment extends CodeFrame implements Global {
    isGlobal = true;
    public text: PlainText;

    constructor(parent: Parent) {
        super(parent);
        this.text = new PlainText(this);
    }

    getPrefix(): string {
        return 'com';
    }

    public override selectFirstText(): boolean {
        this.text.select(true, false);
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