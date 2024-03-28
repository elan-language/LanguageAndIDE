import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class SetField extends AbstractField { 
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
    }
    getIdPrefix(): string {
        return 'ident';
    }
    initialiseRoot(): ParseNode | undefined { 
        var varRef = () => new VarRefNode(this);
        var deconTup = () => new DeconstructedTuple(this);
        var deconList = () => new DeconstructedList(this);
        this.rootNode = new Alternatives([varRef, deconTup, deconList], this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined = undefined;
}