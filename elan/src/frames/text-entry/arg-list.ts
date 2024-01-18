import { Text } from "./text";
import { nextId } from "../helpers";

export class ArgList extends Text {
    constructor() {
        super("arguments");
        this.htmlId = `args${nextId()}`;
    }
}