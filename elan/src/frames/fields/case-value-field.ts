import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { LitValueNode } from "../parse-nodes/lit-value";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class CaseValueField extends AbstractField {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value");
    }
    getHelp(): string {
        return "Literal value (e.g. number or string)";
    }
    initialiseRoot(): ParseNode | undefined { 
        this.rootNode = new LitValueNode(this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined = 
     (source: CodeSource) => source.readToEndOfLine();
}