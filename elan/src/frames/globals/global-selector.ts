import { PlainText } from "../text-entry/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";

export class GlobalSelector extends AbstractFrame implements Global {
    text: PlainText = new PlainText("main, procedure, function, constant ...");

    constructor() {
        super();
        this.htmlId = `globalSelect${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<global class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</statement>`;
    }
} 
