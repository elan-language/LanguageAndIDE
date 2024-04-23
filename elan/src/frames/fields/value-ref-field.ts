import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { Alternatives } from "../parse-nodes/alternatives";
import { LiteralNode } from "../parse-nodes/literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { VarRefNode } from "../parse-nodes/var-ref-node";
import { AbstractField } from "./abstract-field";

export class ValueRefField extends AbstractField {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("value");
    }
    getIdPrefix(): string {
        return 'expr';
    }
    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        var variableRef = () => new VarRefNode();
        var literal = () => new LiteralNode();
        this.rootNode = new Alternatives([variableRef, literal]);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readUntil(/\s|\r|\n/);
}