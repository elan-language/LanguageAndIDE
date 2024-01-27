import { Frame } from "../frame";
import { Text } from "./text";

export class ParamList extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("parameter definitions");
        this.htmlId = `params${this.nextId()}`;
        this.useHtmlTags = true;
    }
}