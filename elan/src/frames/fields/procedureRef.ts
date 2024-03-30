import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseByNodes } from "../interfaces/parse-by-nodes";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { Sequence } from "../parse-nodes/sequence";
import { SymbolNode } from "../parse-nodes/symbol-node";
import { AbstractField } from "./abstract-field";

export class ProcedureRef extends AbstractField implements ParseByNodes {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode { 
        var instance = () => new IdentifierNode(this);
        var dot = () => new SymbolNode(".", this);        
        var proc = () => new IdentifierNode(this);
        var qualProc = () => new Sequence([instance, dot, proc], this);
        this.rootNode =  new Alternatives([proc, qualProc], this);    
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readUntil(/\(/);

    public textAsHtml(): string {
        if (this.selected) {
            return super.textAsHtml();
        } else { 
            return `<method>${this.text}</method>`;
        } 
    }
}