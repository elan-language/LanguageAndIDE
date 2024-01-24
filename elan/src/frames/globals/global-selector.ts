import { PlainText } from "../text-fields/plain_text";
import { AbstractFrame } from "../abstract-frame";
import { Global } from "./global";
import { Frame } from "../frame";

export class GlobalSelector extends AbstractFrame implements Global {
    text: PlainText = new PlainText("main, procedure, function, constant ...");

    constructor() {
        super();
        this.htmlId = `globalSelect${this.nextId()}`;
    }

    public override initialize(frameMap: Map<string, Frame>, parent?: Frame | undefined): void {
        super.initialize(frameMap, parent);
        this.text.initialize(frameMap, this);
    }

    public override selectFirstText(): boolean {
        this.text.select();
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
