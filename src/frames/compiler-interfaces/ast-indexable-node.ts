import { SymbolType } from "../frame-interfaces/symbol-type";
import { AstQualifiedNode } from "./ast-qualified-node";

export interface AstIndexableNode extends AstQualifiedNode {
  rootSymbolType(): SymbolType;
}
