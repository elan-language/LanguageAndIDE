import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { typesList } from "./parse-functions";

export class TypeList extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("type(s)");
    }
    getIdPrefix(): string {
        return 'args';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return typesList(input);
    }   
}