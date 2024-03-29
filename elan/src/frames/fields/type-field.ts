import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseByNodes } from "../interfaces/parse-by-nodes";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { AbstractField } from "./abstract-field";

export class TypeField extends AbstractField  implements ParseByNodes {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Type";
    }
    getIdPrefix(): string {
        return 'type';
    }
    initialiseRoot(): ParseNode { 
        this.rootNode = new TypeNode(this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readToEndOfLine(); 
}