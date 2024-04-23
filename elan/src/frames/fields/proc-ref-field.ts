import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { AbstractField } from "./abstract-field";
import { ParseStatus } from "../parse-status";

export class ProcRefField extends AbstractField {
    isParseByNodes = true;
    
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("procedureName");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode { 
        var qualProc = () => new InstanceProcRef();
        var proc = () => new IdentifierNode();
        this.rootNode =  new Alternatives([proc, qualProc]); 
        this.rootNode.setCompletionWhenEmpty(this.placeholder);  //Need to test proc first, otherwise valid proc would be treated as instance part of an incomplete qualProc
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readUntil(/\(/);

    public textAsHtml(): string {
        var text: string;
        if (this.selected) {
            text = super.textAsHtml();
        } else { 
            if (this.getParseStatus() === ParseStatus.valid || this.getParseStatus() === ParseStatus.valid) {
                var bestMatch = (this.rootNode! as Alternatives).bestMatch;
                if (bestMatch instanceof IdentifierNode) {
                    text =  `<method>${this.text}</method>`;
                } else {                    
                    text =  (bestMatch as InstanceProcRef).renderAsHtml();
                }

            } else {
                text =  super.textAsHtml();
            }
        } 
        return text;
    }
}