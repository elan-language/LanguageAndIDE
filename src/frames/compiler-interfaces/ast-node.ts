import { SymbolScope } from "../symbols/symbol-scope";
import { SymbolType } from "./symbol-type";

export interface AstNode {
  symbolType(): SymbolType;

  symbolScope: SymbolScope;

  compile(): string;

  fieldId: string;

  indent(): string;
}
