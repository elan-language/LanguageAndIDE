import { TextEntry } from "./text-entry";
import { nextId } from "../helpers";

export class ParamList extends TextEntry {
    constructor() {
        super("parameter definitions");
        this.htmlId = `params${nextId()}`;
    }
}