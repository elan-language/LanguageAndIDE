import { AbstractFrame } from "../abstract-frame";


export abstract class Text extends AbstractFrame {
    public htmlId: string = "";
    protected text: string = "";
    protected prompt: string = "";

    constructor(prompt: string) {
        super();
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