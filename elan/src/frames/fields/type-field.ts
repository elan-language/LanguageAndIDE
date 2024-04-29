import { UnknownType } from "../../symbols/unknown-type";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { ParseNode } from "../parse-nodes/parse-node";
import { TypeNode } from "../parse-nodes/type-node";
import { TypeAsn } from "../syntax-nodes/type-asn";
import { AbstractField } from "./abstract-field";

export class TypeField extends AbstractField  {
    isParseByNodes = true;
    constructor(holder: Frame) {
        super(holder);
        this.useHtmlTags = true;
        this.placeholder = "Type";
        this.help = `A simple Type name must begin with an upper-case letter. More complex types are: 'generic type', 'tuple type', 'function type' - consult documentation for these.`;
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

    compile(): string {
        this.compileErrors = [];
        const code = super.compile();
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