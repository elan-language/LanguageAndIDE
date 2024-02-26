import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { identifierList } from "./parse-functions";


export class EnumValues extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
    }
    getIdPrefix(): string {
        return 'enumVals';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return identifierList(input);
    }
}