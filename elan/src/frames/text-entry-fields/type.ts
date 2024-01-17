import { Text } from "./text";
import { nextId } from "../helpers";

export class Type extends Text {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `type${nextId()}`;
    }

}