import { Text } from "./text";


export class PlainText extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `text${this.nextId()}`;
    }

}