import { Text } from "./text";
import { nextId } from "../helpers";

export class PlainText extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `text${nextId()}`;
    }

}