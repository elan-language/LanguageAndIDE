import { Text } from "./text";


export class TypeList extends Text {
    constructor() {
        super("type(s)");
        this.htmlId = `args${this.nextId()}`;
    }
}