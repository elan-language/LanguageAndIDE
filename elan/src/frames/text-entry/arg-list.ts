import { Text } from "./text";


export class ArgList extends Text {
    constructor() {
        super("arguments");
        this.htmlId = `args${this.nextId()}`;
    }
}