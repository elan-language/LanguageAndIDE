import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class Identifier extends TextEntry {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `ident${nextId()}`;
    }

}