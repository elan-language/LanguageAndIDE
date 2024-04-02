import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { CSV } from "../parse-nodes/csv";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { AbstractField } from "./abstract-field";

export class InheritsFrom extends AbstractField {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("type(s)");
    }
    getIdPrefix(): string {
        return 'args';
    }
    initialiseRoot(): ParseNode {
        this.rootNode = new CSV(() => new TypeNode(this) ,1, this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readToEndOfLine();
}