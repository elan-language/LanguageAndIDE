import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { CSV } from "../parse-nodes/csv";
import { Multiple } from "../parse-nodes/multiple";
import { ParseNode } from "../parse-nodes/parse-node";
import { Sequence } from "../parse-nodes/sequence";

export interface Transforms {
  transform(node: ParseNode | undefined, fieldId: string, scope: Scope): AstNode | undefined;
  transformMany(node: CSV | Multiple | Sequence, fieldId: string, scope: Scope): AstCollectionNode;
}
