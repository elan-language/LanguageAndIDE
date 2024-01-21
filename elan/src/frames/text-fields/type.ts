import { Text } from "./text";


export class Type extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `type${this.nextId()}`;
    }

    renderAsHtml(): string {  
        return `<text id="${this.htmlId}" class="${this.class()}" tabindex=0>${this.formattedContent()}</text>`;
    }
}