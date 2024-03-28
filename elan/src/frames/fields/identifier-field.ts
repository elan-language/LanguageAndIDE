import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { identifier } from "./parse-functions";

export class IdentifierField extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return identifier(input);
    }   
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}