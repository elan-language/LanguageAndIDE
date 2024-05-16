import { AstIdNode } from "./ast-id-node";
import { AstNode } from "./ast-node";

export interface AstQualifierNode extends AstNode {
    value : AstIdNode;
}