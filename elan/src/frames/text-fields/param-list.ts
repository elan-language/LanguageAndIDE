import { Text } from "./text";


export class ParamList extends Text {
    constructor() {
        super("parameter definitions");
        this.htmlId = `params${this.nextId()}`;
        this.useHtmlTags = true;
    }
}