import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { variableDef } from "./parse-functions";

export class VariableDef extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'var';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return variableDef(input);
    }
    getNewRootNode(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined; 
}