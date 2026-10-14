import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { FileImpl } from "../frames/file-impl";
import { Frame } from "../frames/frame-interfaces/frame";
import { ParseNode } from "../frames/frame-interfaces/parse-node";

export interface Transforms {
  transform(
    node: ParseNode | FileImpl | Frame | undefined,
    fieldId: string,
    scope: Scope | undefined,
  ): AstNode | undefined;
}
