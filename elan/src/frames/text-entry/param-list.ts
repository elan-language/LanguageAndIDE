import { Text } from "./text";
import { nextId } from "../helpers";

export class ParamList extends Text {
    constructor() {
        super("parameter definitions");
        this.htmlId = `params${nextId()}`;
    }
}