import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { literal } from "./parse-functions";

//Literal value or data structure
export class Literal extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("lit");
    }
    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return literal(input);
    } 
    getNewRootNode(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined; 
}