import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { type } from "./parse-functions";

export class TypeDef extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Type";
    }
    getIdPrefix(): string {
        return 'type';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return type(input);
    }   
}