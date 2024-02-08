import { AbstractFrame } from "../abstract-frame";
import { PlainText } from "../fields/plain_text";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";

export class GlobalComment extends AbstractFrame {
    isGlobal = true;
    public text: PlainText;

    constructor(parent: Parent) {
        super(parent);
        this.text = new PlainText(this);
        this.text.setPrompt("comment");
    }

    getFields(): Field[] {
        return [this.text];
    }

    getIdPrefix(): string {
        return 'com';
    }

    public override selectFirstField(): boolean {
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