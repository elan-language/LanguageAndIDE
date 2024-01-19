import { Text } from "./text";


export class Identifier extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `ident${this.nextId()}`;
    }
}