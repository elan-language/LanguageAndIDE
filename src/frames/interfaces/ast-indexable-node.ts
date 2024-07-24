import { AstQualifiedNode } from "./ast-qualified-node";
import { SymbolType } from "./symbol-type";

export interface AstIndexableNode extends AstQualifiedNode {
  rootSymbolType(): SymbolType;
}
