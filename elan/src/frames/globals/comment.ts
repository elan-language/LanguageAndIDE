import { AbstractFrame } from "../abstract-frame";
import { Frame } from "../frame";
import { PlainText } from "../text-fields/plain_text";
import { Global } from "./global";

export class Comment extends AbstractFrame implements Global {

    public text: PlainText = new PlainText("");

    constructor() {
        super();
        this.htmlId = `com${this.nextId()}`;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    renderAsHtml(): string {
        return `<comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment>`;
    }
} 