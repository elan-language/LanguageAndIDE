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
        this.astNode = undefined; 
        var varRef = () => new AssignableNode();
        var deconTup = () => new DeconstructedTuple();
        var deconList = () => new DeconstructedList();
        this.rootNode = new Alternatives([varRef, deconTup, deconList]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  = (source: CodeSource) => source.readUntil(/(\s+to\s+)|\r|\n/);
} 