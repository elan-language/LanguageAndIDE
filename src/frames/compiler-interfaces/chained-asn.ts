import { AstNode } from "./ast-node";
import { Scope } from "./scope";

export interface ChainedAsn extends AstNode {
  updateScopeAndChain(scope: Scope, ast: AstNode): void;

  showPreviousNode: boolean;

  isAsync: boolean;
}
