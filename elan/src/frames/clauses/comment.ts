import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../statements/statement";
import { PlainText } from "../text-entry/plain_text";
import { Global } from "../globals/global";

export class Comment extends AbstractFrame implements Global {

    public text: PlainText = new PlainText("");
    public indent : boolean = false;

    constructor() {
        super();
        this.htmlId = `com${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `${this.indent ? "<indent>" : ""}<comment class="${this.cls()}" id='${this.htmlId}' tabindex="0"># ${this.text.renderAsHtml()}</comment>${this.indent ? "</indent>" : ""}`;
    }
} 