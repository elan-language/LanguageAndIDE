import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";

import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { transform, transformMany } from "../syntax-nodes/ast-visitor";
import { CsvAsn } from "../syntax-nodes/csv-asn";
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
        this.astNode = undefined; 
        this.rootNode = new CSV(() => new IdentifierNode(), 1);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  =
        (source: CodeSource) => source.readToEndOfLine();

    renderAsObjectCode(): string {
        const ast = this.getOrTransformAstNode as CsvAsn;

        if (ast) {
            return ast.items.map(n =>  `${n.renderAsObjectCode()} : "${n.renderAsObjectCode()}"`).join(", ");
        }

        return "";
    }
}