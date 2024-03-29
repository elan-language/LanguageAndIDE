import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";
import { ExprNode } from "../parse-nodes/expr-node";
import { CSV } from "../parse-nodes/csv";
import { ParseByNodes } from "../interfaces/parse-by-nodes";

export class ArgListField extends AbstractField implements ParseByNodes {
    isParseByNodes = true;

    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("arguments");
        this.setOptional(true);
    }
    getIdPrefix(): string {
        return 'args';
    }
    public contentAsSource() : string {
        if (this.text) {
         return this.text;
        } else {
            return "";
        }
    }
    initialiseRoot(): ParseNode  { 
        this.rootNode = new CSV(() => new ExprNode(this),0, this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  = 
      (source: CodeSource) => source.readToNonMatchingCloseBracket();
}