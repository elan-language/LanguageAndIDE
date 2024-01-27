import { Frame } from "../frame";
import { Text } from "./text";

export class Identifier extends Text {
    constructor(parent: Frame) {
        super(parent);
        this.htmlId = `ident${this.nextId()}`;
        this.setPrompt("name");
    }
}