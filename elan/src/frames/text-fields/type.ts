import { Frame } from "../frame";
import { Text } from "./text";

export class Type extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `type${this.nextId()}`;
        this.useHtmlTags = true;
        this.prompt = "Type";
    }
}