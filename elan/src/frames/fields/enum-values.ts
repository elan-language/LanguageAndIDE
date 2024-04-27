import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";

import { CSV } from "../parse-nodes/csv";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { CsvAsn } from "../syntax-nodes/csv-asn";
import { AbstractField } from "./abstract-field";

export class EnumValues extends AbstractField {
    isParseByNodes = true;
     
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("values");
        this.help = `Comma-separated list of names, each of which must start with a lower-case letter, with same possible other characters as a variable name.`;
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

    compile(): string {
        const ast = this.getOrTransformAstNode as CsvAsn;

        if (ast) {
            return ast.items.map(n =>  `${n.compile()} : "${n.compile()}"`).join(", ");
        }

        return "";
    }
}