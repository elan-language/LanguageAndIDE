import { Frame } from "../frame";
import { Text } from "./text";

export class Expression extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `expr${this.nextId()}`;
        this.setPrompt("value or expression");
    }
}