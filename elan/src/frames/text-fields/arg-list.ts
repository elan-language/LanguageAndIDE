import { Frame } from "../frame";
import { Text } from "./text";

export class ArgList extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.setPrompt("arguments");
        this.htmlId = `args${this.nextId()}`;
    }
}