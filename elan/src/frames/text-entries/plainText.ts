import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class PlainText extends TextEntry {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `text${nextId()}`;
    }

}