import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class Expression extends TextEntry {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `expr${nextId()}`;
    }

}