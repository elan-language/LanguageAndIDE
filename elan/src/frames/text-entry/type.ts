import { Text } from "./text";


export class Type extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `type${this.nextId()}`;
    }

    renderAsHtml(): string {
        return `<type id="${this.htmlId}" class="${this.class()}" tabindex=0>${this.content()}</type>`;
    }

}