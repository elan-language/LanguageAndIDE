import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class Type extends TextEntry {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `type${nextId()}`;
    }

}