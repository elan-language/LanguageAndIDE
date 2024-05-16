import { AstNode } from "./ast-node";

export interface AstCollectionNode extends AstNode {
  items: AstNode[];
}
