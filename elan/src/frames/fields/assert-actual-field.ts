import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { FunctionCallNode } from "../parse-nodes/function-call-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class AssertActualField extends AbstractField {

    constructor(holder: Frame) {
        super(holder);
        this.placeholder = "function call or variable";
    }
    
    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        var variableRef = () => new VarRefNode();
        var functionCall = () => new FunctionCallNode();
        this.rootNode = new Alternatives([variableRef, functionCall]);
        return this.rootNode; 
    }

    readToDelimeter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\sis\s/);
}