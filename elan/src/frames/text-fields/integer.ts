import { Frame } from "../frame";
import { Text } from "./text";

export class Integer extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `int${this.nextId()}`;
    }
}