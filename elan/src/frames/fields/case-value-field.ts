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
    }
    initialiseRoot(): ParseNode { 
        this.rootNode = new LitValueNode();
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = 
     (source: CodeSource) => source.readToEndOfLine();
}