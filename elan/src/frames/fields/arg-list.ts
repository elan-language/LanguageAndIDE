import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";
import { ParseStatus } from "../parse-status";
import { argsList } from "./parse-functions";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";

export class ArgList extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("arguments");
        this.setOptional(true);
    }
    getIdPrefix(): string {
        return 'args';
    }
    public contentAsSource() : string {
        if (this.text) {
         return this.text;
        } else {
            return "";
        }
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return argsList(input);
    }  
    getNewRootNode(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}