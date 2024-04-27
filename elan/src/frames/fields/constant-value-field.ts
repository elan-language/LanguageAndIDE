import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { LiteralNode } from "../parse-nodes/literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { AbstractField } from "./abstract-field";

export class ConstantValueField extends AbstractField {  
    isParseByNodes = true;
     
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("literal");
        this.help = `A literal value (such as a number or string), or a literal List or Dictionary (consult documentation for format).`;
    }

    initialiseRoot(): ParseNode {
        this.astNode = undefined; 
        this.rootNode = new LiteralNode();
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) = (source: CodeSource) =>
      source.readToEndOfLine();
}