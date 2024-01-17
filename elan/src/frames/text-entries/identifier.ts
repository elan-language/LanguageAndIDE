import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class Identifier extends TextEntry {
    constructor() {
        super("name");
        this.htmlId = `ident${nextId()}`;
    }

}