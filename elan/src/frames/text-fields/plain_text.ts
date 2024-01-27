import { Frame } from "../frame";
import { Text } from "./text";

export class PlainText extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `text${this.nextId()}`;
    }

}