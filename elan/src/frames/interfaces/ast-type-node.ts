import { AstIdNode } from "./ast-id-node";

export interface AstTypeNode extends AstIdNode {
    renderAsDefaultObjectCode() : string;
}