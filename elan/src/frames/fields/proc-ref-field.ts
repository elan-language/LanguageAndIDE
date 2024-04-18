import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { AbstractField } from "./abstract-field";

export class ProcRefField extends AbstractField {
    isParseByNodes = true;
    
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("procedure");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode { 
        var qualProc = () => new InstanceProcRef();
        var proc = () => new IdentifierNode();
        this.rootNode =  new Alternatives([proc, qualProc]);   //Need to test proc first, otherwise valid proc would be treated as instance part of an incomplete qualProc
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