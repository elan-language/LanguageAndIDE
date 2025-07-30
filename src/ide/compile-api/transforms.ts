import { AstCollectionNode } from "../../compiler/compiler-interfaces/ast-collection-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { FileImpl } from "../frames/file-impl";
import { Frame } from "../frames/frame-interfaces/frame";
import { ParseNode } from "../frames/frame-interfaces/parse-node";
import { CSV } from "../frames/parse-nodes/csv";
import { Multiple } from "../frames/parse-nodes/multiple";
import { Sequence } from "../frames/parse-nodes/sequence";

export interface Transforms {
  transform(
    node: ParseNode | FileImpl | Frame | undefined,
    fieldId: string,
    scope: Scope | undefined,
  ): AstNode | undefined;
  transformMany(node: CSV | Multiple | Sequence, fieldId: string, scope: Scope): AstCollectionNode;
}
