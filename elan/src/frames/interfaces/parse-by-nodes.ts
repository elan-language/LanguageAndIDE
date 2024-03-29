import { CodeSource } from "../code-source";
import { ParseNode } from "../parse-nodes/parse-node";

export interface ParseByNodes {
    isParseByNodes: boolean;
    initialiseRoot(): ParseNode 
    readToDelimeter: ((source: CodeSource) => string);
}