import { Text } from "./text";
import { nextId } from "../helpers";

export class Identifier extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `ident${nextId()}`;
    }
}