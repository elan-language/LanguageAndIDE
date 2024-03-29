import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { Sequence } from "../parse-nodes/sequence";
import { SymbolNode } from "../parse-nodes/symbol-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class ProcedureRef extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode | undefined { 
        var instance = () => new VarRefNode(this);
        var dot = () => new SymbolNode(".", this);        
        var proc = () => new IdentifierNode(this);
        var qualProc = () => new Sequence([instance, dot, proc], this);
        this.rootNode =  new Alternatives([proc, qualProc], this);    
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined = (source: CodeSource) => source.readUpToFirstMatch(/\(/);

    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        } else { 
            return `<method>${this.text}</method>`;
        } 
    }
}