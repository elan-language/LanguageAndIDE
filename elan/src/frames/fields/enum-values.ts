import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
    }
    getIdPrefix(): string {
        return 'enumVals';
    }
    initialiseRoot(): ParseNode | undefined { 
        this.rootNode = new CSV(() => new IdentifierNode(this), 1, this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined =
        (source: CodeSource) => source.readToEndOfLine();
}