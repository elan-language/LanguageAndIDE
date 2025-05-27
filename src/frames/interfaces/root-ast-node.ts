import { CompileError } from "../compile-error";
import { BreakpointEvent } from "../status-enums";
import { AstNode } from "./ast-node";
import { Scope } from "./scope";
import { Semver } from "./semver";

export enum CompileMode {
  inprocess,
  worker,
  debugWorker,
  testWorker,
  standaloneWorker,
}

export interface RootAstNode extends AstNode, Scope {
  addCompileErrors(errors: CompileError[]): void;
  isFile: boolean; // todo rename to isRoot
  libraryScope: Scope;
  getAllCompileErrors(): CompileError[];
  getCompileErrorsFor(fieldId: string): CompileError[];
  children: AstNode[];
  getNextId(): number;
  getVersion(): Semver;
  setCompileOptions(mode: CompileMode, base: string | undefined): void;
  updateBreakpoints(event: BreakpointEvent): void;
}
