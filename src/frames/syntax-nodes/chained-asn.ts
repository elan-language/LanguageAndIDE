import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";

export interface ChainedAsn extends AstNode {
  updateScopeAndChain(scope: Scope, ast: AstNode): void;

  showPreviousNode: boolean;

  isAsync: boolean;
}
