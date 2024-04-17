import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";

import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { transform, transformMany } from "../syntax-nodes/ast-visitor";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {
    isParseByNodes = true;
     
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
    }
    getIdPrefix(): string {
        return 'enumVals';
    }
    initialiseRoot(): ParseNode { 
        this.rootNode = new CSV(() => new IdentifierNode(), 1);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  =
        (source: CodeSource) => source.readToEndOfLine();

    renderAsObjectCode(): string {
        if (this.rootNode && this.rootNode.status === ParseStatus.valid){
            const astNodes = transformMany(this.rootNode as CSV, this.getHolder());
            return astNodes.map(n =>  `${n.renderAsObjectCode()} : "${n.renderAsObjectCode()}"`).join(", ");
        }

        return "";
    }
}