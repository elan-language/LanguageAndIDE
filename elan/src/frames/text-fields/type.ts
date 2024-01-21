import { Text } from "./text";


export class Type extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `type${this.nextId()}`;
        this.useHtmlTags = true;
    }
}