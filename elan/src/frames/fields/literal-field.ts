import { IHasSymbolType } from "../../symbols/has-symbol-type";
import { isHasSymbolType } from "../../symbols/symbolHelpers";
import { UnknownType } from "../../symbols/unknown-type";
import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { LiteralNode } from "../parse-nodes/literal-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { ParseStatus } from "../parse-status";
import { AbstractField } from "./abstract-field";
import { literal } from "./parse-functions";

//Literal value or data structure
export class LiteralField extends AbstractField implements IHasSymbolType {   
    constructor(holder: Frame) {
        super(holder);
        this.setPlaceholder("lit");
    }
    getHelp(): string {
        return "";
    }
    parseFunction(input: [ParseStatus, string]): [ParseStatus, string] {
        return literal(input);
    } 
    initialiseRoot(): ParseNode | undefined { 
        this.rootNode = new LiteralNode(this);
        return this.rootNode; 
    }
    readToDelimeter: ((source: CodeSource) => string) | undefined = (source: CodeSource) =>
      source.readToEndOfLine();

    get symbolType() {
        if (isHasSymbolType(this.rootNode)) {
            return this.rootNode.symbolType;
        }

        return UnknownType.Instance;
    }
}