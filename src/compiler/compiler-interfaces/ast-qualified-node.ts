import { EmptyAsn } from "../syntax-nodes/empty-asn";
import { AstIdNode } from "./ast-id-node";
import { AstNode } from "./ast-node";

export interface AstQualifiedNode extends AstIdNode {
  qualifier: AstNode | EmptyAsn;
}
