import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { CompileError } from "../compile-error";

export class AbstractAstNode {
  compileErrors: CompileError[] = [];
  get symbolScope() {
    return SymbolScope.unknown;
  }

  indent() {
    return "";
  }

  singleIndent() {
    return "  ";
  }
}
