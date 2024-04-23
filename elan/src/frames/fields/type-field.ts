import { UnknownType } from "../../symbols/unknown-type";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { ParseStatus } from "../parse-status";
import { transform } from "../syntax-nodes/ast-visitor";
import { TypeAsn } from "../syntax-nodes/type-asn";
import { AbstractField } from "./abstract-field";

export class TypeField extends AbstractField  {
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
        this.astNode = undefined; 
        this.rootNode = new TypeNode();
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readToEndOfLine(); 

    renderAsObjectCode(): string {
        const code = super.renderAsObjectCode();
        if (this.astNode instanceof TypeAsn) {
            return this.astNode.renderAsDefaultObjectCode();
        }
        return code;
    }

    get symbolType() {
        const astNode = this.getOrTransformAstNode;
        if (astNode) {
            return astNode.symbolType;
        }
        return UnknownType.Instance;
    }
}