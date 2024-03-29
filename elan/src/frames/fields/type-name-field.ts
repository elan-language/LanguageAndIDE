import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { simpleType } from "./parse-functions";

export class TypeNameField extends AbstractField {
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
    initialiseRoot(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;  

    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        }
        else{ 
            return `<type>${this.text}</type>`;
        } 
    }

}