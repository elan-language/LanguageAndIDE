import { Frame } from "../interfaces/frame";
import { ParseByFunction } from "../interfaces/parse-by-function";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { simpleType } from "./parse-functions";

export class TypeNameField extends AbstractField implements ParseByFunction {
    isParseByFunction = true;
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Name";
    }
    getIdPrefix(): string {
        return 'type';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return simpleType(input);
    } 
    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        }
        else{ 
            return `<type>${this.text}</type>`;
        } 
    }

}