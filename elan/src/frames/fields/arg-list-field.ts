import { AbstractField } from "./abstract-field";
import { Frame } from "../interfaces/frame";
import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";
import { ExprNode } from "../parse-nodes/expr-node";
import { CSV } from "../parse-nodes/csv";
import { transformMany } from "../syntax-nodes/ast-visitor";
import { Scope } from "../interfaces/scope";


export class ArgListField extends AbstractField {
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
        this.astNode = undefined; 
        this.rootNode = new CSV(() => new ExprNode(),0);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string)  = 
      (source: CodeSource) => source.readToNonMatchingCloseBracket();

}