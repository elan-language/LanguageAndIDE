import { Text } from "./text";


export class Expression extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `expr${this.nextId()}`;
    }
}