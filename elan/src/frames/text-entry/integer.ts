import { Text } from "./text";
import { nextId } from "../helpers";

export class Integer extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `int${nextId()}`;
    }
}