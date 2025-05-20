import { CompileError } from "../compile-error";
import { AstNode } from "./ast-node";
import { Scope } from "./scope";

export interface RootAstNode extends AstNode, Scope {
  addCompileErrors(errors: CompileError[]): void;
  isFile: boolean; // todo rename to isRoot
  libraryScope: Scope;
  getAllCompileErrors(): CompileError[];
  getCompileErrorsFor(fieldId: string): CompileError[];
}
