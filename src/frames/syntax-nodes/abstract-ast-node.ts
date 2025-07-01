import { CompileError } from "../compile-error";
import { SymbolScope } from "../symbols/symbol-scope";

export class AbstractAstNode {
  compileErrors: CompileError[] = [];
  get symbolScope() {
    return SymbolScope.unknown;
  }

  indent() {
    return "";
  }
}
