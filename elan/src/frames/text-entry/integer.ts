import { Text } from "./text";


export class Integer extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `int${this.nextId()}`;
    }
}