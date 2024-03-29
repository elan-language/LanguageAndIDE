import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { variableDef as variableDefFunction } from "./parse-functions";

export class VarDefField extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'var';
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return variableDefFunction(input);
    }
    initialiseRoot(): ParseNode | undefined { return undefined; }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined; 
}