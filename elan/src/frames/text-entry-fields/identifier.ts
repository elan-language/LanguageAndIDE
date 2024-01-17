import { Text } from "./text";
import { nextId } from "../helpers";

export class Identifier extends Text {
    constructor() {
        super("name");
        this.htmlId = `ident${nextId()}`;
    }

}