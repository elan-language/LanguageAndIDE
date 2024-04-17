import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";
import { ParseStatus } from "../parse-status";
import { transform } from "../syntax-nodes/ast-visitor";
import { Scope } from "../interfaces/scope";
import { AssignableNode } from "../parse-nodes/assignable-node";

export class AssignableField extends AbstractField { 
    isParseByNodes = true;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("variable");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode  { 
        var varRef = () => new AssignableNode();
        var deconTup = () => new DeconstructedTuple();
        var deconList = () => new DeconstructedList();
        this.rootNode = new Alternatives([varRef, deconTup, deconList]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  = (source: CodeSource) => source.readUntil(/(\s+to\s+)|\r|\n/);

    renderAsObjectCode(): string {
        if (this.rootNode && this.rootNode.status === ParseStatus.valid){
            this.astNode = transform(this.rootNode, this.getHolder() as unknown as Scope); // TODO fix type
            return this.astNode?.renderAsObjectCode() ?? "";
        }

        return "";
    }
} 