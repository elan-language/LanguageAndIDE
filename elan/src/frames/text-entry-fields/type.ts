import { Text } from "./text";
import { nextId } from "../helpers";

export class Type extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `type${nextId()}`;
    }

    renderAsHtml(): string {
        return `<type id="${this.htmlId}" class="${this.class()}" tabindex=0>${this.content()}</type>`;
    }

}