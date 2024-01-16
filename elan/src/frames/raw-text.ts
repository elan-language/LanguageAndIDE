import { TextEntry } from "./textEntry";
import { nextId } from "./helpers";

export class RawText implements TextEntry {
    htmlId: string = "";
    text: string = "";
    prompt: string = "";

    constructor(prompt: string) {
        this.htmlId = `rawText${nextId()}`;
        this.prompt = prompt;
    }

    private content() : String {
       if (this.text) {
        return this.text;
       } else {
        return this.prompt;
       }
    }

    private class() : String {
        if (this.text) {
            return "";
           } else {
            return "empty";
           }
    }

    renderAsHtml(): string {
        return `<textEntry id="${this.htmlId}" class="${this.class()}" tabIndex=0>${this.content()}</textEntry>`;
    }

    enterText(text: string): void {
		this.text = text;
	}
}