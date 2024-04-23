import { UnknownType } from "../../symbols/unknown-type";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { LiteralNode } from "../parse-nodes/literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { transform } from "../syntax-nodes/ast-visitor";
import { AbstractField } from "./abstract-field";

export class ConstantValueField extends AbstractField {  
    isParseByNodes = true;
     
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("lit");
    }

    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        this.rootNode = new LiteralNode();
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) =>
      source.readToEndOfLine();
}