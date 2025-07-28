import { AstNode } from "./ast-node";

export interface AstQualifierNode extends AstNode {
  value: AstNode;
}
