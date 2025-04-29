import { CSV } from "../parse-nodes/csv";
import { Multiple } from "../parse-nodes/multiple";
import { Sequence } from "../parse-nodes/sequence";
import { AstCollectionNode } from "./ast-collection-node";
import { AstNode } from "./ast-node";
import { ParseNode } from "./parse-node";
import { Scope } from "./scope";

export interface Transforms {
  transform(node: ParseNode | undefined, fieldId: string, scope: Scope): AstNode | undefined;
  transformMany(node: CSV | Multiple | Sequence, fieldId: string, scope: Scope): AstCollectionNode;
}
