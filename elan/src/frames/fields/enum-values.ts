import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseByNodes } from "../interfaces/parse-by-nodes";
import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField implements ParseByNodes {
    isParseByNodes = true;
     
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
    }
    getIdPrefix(): string {
        return 'enumVals';
    }
    initialiseRoot(): ParseNode { 
        this.rootNode = new CSV(() => new IdentifierNode(this), 1, this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  =
        (source: CodeSource) => source.readToEndOfLine();
}