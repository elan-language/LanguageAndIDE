import { Text } from "./text";
import { nextId } from "../helpers";

export class EnumValues extends Text {
    constructor() {
        super("values");
        this.htmlId = `enumVals${nextId()}`;
    }
}