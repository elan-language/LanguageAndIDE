import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { LiteralNode } from "../parse-nodes/literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class ValueRefField extends AbstractField  {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value or expression");
    }
    getIdPrefix(): string {
        return 'expr';
    }
    initialiseRoot(): ParseNode | undefined { 
        var variableRef = () => new VarRefNode(this);
        var literal = () => new LiteralNode(this);
        this.rootNode = new Alternatives([variableRef, literal], this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined = (source: CodeSource) => source.readUpToFirstMatch(/\s|\r|\n/);
}