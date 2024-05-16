import { AstIdNode } from "./ast-id-node";
import { AstQualifierNode } from "./ast-qualifier-node";
import { SymbolType } from "./symbol-type";

export interface AstQualifiedNode extends AstIdNode {
    qualifier : AstQualifierNode | undefined;
    rootSymbolType() : SymbolType;
}