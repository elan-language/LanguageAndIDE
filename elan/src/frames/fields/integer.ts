import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { literalInt } from "./parse-functions";

export class Integer extends AbstractField {  
    constructor(holder: Frame) {
        super(holder);
        this.placeholder = "integer";
    }

    getIdPrefix(): string {
        return `int`;
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return literalInt(input);
    }   
    getNewRootNode(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}