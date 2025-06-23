import { SymbolType } from "../frame-interfaces/symbol-type";
import { SymbolScope } from "../symbols/symbol-scope";

export interface AstNode {
  symbolType(): SymbolType;

  symbolScope: SymbolScope;

  compile(): string;

  fieldId: string;

  indent(): string;
}
