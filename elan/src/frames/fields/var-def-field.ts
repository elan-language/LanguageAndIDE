import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseByNodes } from "../interfaces/parse-by-nodes";
import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class VarDefField extends AbstractField implements ParseByNodes {
    isParseByNodes = true;  
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'var';
    }
    initialiseRoot(): ParseNode { 
        var varRef = () => new IdentifierNode(this);
        var deconTup = () => new DeconstructedTuple(this);
        var deconList = () => new DeconstructedList(this);
        this.rootNode = new Alternatives([varRef, deconTup, deconList], this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readUpToFirstMatch(/(\s+set to\s+)|\r|\n/);
}