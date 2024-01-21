import { Text } from "./text";


export class EnumValues extends Text {
    constructor() {
        super("values");
        this.htmlId = `enumVals${this.nextId()}`;
    }
}