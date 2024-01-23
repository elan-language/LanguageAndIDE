import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { newLine } from "../helpers";
import { PlainText } from "../text-fields/plain_text";
import { Global } from "./global";

export class GlobalComment extends AbstractFrame implements Global {

    public text: PlainText = new PlainText("");

    constructor() {
        super();
        this.htmlId = `com${this.nextId()}`;
    }

    isGlobal = true;

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    renderAsHtml(): string {
        return `<comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return `
# ${this.text.renderAsSource()}`;
    }
} 