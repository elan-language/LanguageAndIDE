import { PlainText } from "../text-fields/plain_text";
import { CodeFrame } from "../code-frame";
import { Global } from "./global";
import { Frame } from "../frame";

export class GlobalSelector extends CodeFrame implements Global {
    isGlobal = true;
    text: PlainText;

    constructor(parent: Frame) {
        super(parent);
        this.text = new PlainText(this);
        this.text.setPrompt("main, procedure, function, constant ...");
    }

    getPrefix(): string {
        return 'globalSelect';
    }

    public override selectFirstText(): boolean {
        this.text.select(true);
        return true;
    }

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
