import { AstCollectionNode } from "../../../compiler/compiler-interfaces/ast-collection-node";
import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { FileImpl } from "../file-impl";
import { CSV } from "../parse-nodes/csv";
import { Multiple } from "../parse-nodes/multiple";
import { Sequence } from "../parse-nodes/sequence";
import { Frame } from "./frame";
import { ParseNode } from "./parse-node";

export interface Transforms {
  transform(
    node: ParseNode | FileImpl | Frame | undefined,
    fieldId: string,
    scope: Scope | undefined,
  ): AstNode | undefined;
  transformMany(node: CSV | Multiple | Sequence, fieldId: string, scope: Scope): AstCollectionNode;
}
