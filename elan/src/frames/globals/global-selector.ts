import { PlainText } from "../text-entry/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";

export class GlobalSelector extends AbstractFrame implements Global {
    text: PlainText = new PlainText("main, procedure, function, constant ...");

    constructor() {
        super();
        this.htmlId = `globalSelect${this.nextId()}`;
    }

    //TODO: include Comment option
    renderAsHtml(): string {
        return `<globalSelector class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</globalSelector>`;
    }
} 
