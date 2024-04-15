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
        this.rootNode = new TypeNode();
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) => source.readToEndOfLine(); 

    renderAsObjectCode(): string {
        if (this.rootNode && this.rootNode.status === ParseStatus.valid){
            this.astNode = transform(this.rootNode, this.getHolder() as unknown as Scope); // TODO fix type
            if (this.astNode instanceof TypeAsn) {
                return this.astNode.renderAsDefaultObjectCode();
            }

            return this.astNode?.renderAsObjectCode() ?? "";
        }

        return "";
    }

    get symbolType() {
        if (this.astNode) {
            return this.astNode.symbolType;
        }
        return UnknownType.Instance;
    }
}