import { EmptyAsn } from "../syntax-nodes/empty-asn";
import { AstIdNode } from "./ast-id-node";
import { AstQualifierNode } from "./ast-qualifier-node";

export interface AstQualifiedNode extends AstIdNode {
  qualifier: AstQualifierNode | EmptyAsn;
}
