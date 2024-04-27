import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { Alternatives } from "../parse-nodes/alternatives";
import { DeconstructedList } from "../parse-nodes/deconstructed-list";
import { DeconstructedTuple } from "../parse-nodes/deconstructed-tuple";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class VarDefField extends AbstractField {
    isParseByNodes = true;  
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("name");
        this.help = `A variable name must start with a lower-case letter, optionally followed by any letters (lower or upper case), and/or numeric digits, and/or underscores - nothing else. (For'tuple deconstruction' or 'list deconstruction' consult documentation.)`;
    }
    getIdPrefix(): string {
        return 'var';
    }
    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        var varRef = () => new IdentifierNode();
        var deconTup = () => new DeconstructedTuple();
        var deconList = () => new DeconstructedList();
        this.rootNode = new Alternatives([varRef, deconTup, deconList]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readUntil(/(\s+((set to)|(be))\s+)|\r|\n/);
}