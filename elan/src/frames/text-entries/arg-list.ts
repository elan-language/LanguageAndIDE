import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class ArgList extends TextEntry {
    constructor(prompt: string) {
        super(prompt);
        this.htmlId = `argList${nextId()}`;
    }

}