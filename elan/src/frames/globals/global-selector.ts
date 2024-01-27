import { PlainText } from "../text-fields/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";
import { Frame } from "../frame";

export class GlobalSelector extends AbstractFrame implements Global {
    getPrefix(): string {
        return 'globalSelect';
    }
    text: PlainText;

    constructor(parent: Frame) {
        super(parent);
        this.text = new PlainText(this);
        this.text.setPrompt("main, procedure, function, constant ...");
    }

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

    isGlobal = true;

    //TODO: include Comment option
    renderAsHtml(): string {
        return `<globalSelector class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.text.renderAsHtml()}</globalSelector>`;
    }

    indent(): string {
        return "";
    }

    renderAsSource(): string {
        return ``;
    } 
}
