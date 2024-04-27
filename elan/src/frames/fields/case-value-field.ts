import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { LitValueNode } from "../parse-nodes/lit-value";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class CaseValueField extends AbstractField {  
    isParseByNodes = true; 

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value");
        this.help = `Must be a literal value of the same type as the variable specified for the 'switch'.`;
    }
    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        this.rootNode = new LitValueNode();
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = 
     (source: CodeSource) => source.readToEndOfLine();
}