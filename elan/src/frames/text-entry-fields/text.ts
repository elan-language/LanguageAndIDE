import { Frame } from "../frame";
import { nextId } from "../helpers";

export abstract class Text implements Frame {
    public htmlId: string = "";
    protected text: string = "";
    protected prompt: string = "";

    constructor(prompt: string) {
        this.prompt = prompt;
    }

    protected content() : String {
       if (this.text) {
        return this.text;
       } else {
        return this.prompt;
       }
    }

    protected class() : String {
        if (this.text) {
            return "";
           } else {
            return "empty";
           }
    }

    renderAsHtml(): string {
        return `<text id="${this.htmlId}" class="${this.class()}" tabindex=0>${this.content()}</text>`;
    }

    enterText(text: string): void {
		this.text = text;
	}
}