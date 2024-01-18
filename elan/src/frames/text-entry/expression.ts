import { Text } from "./text";
import { nextId } from "../helpers";

export class Expression extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `expr${nextId()}`;
    }

}