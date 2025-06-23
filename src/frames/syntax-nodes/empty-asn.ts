import { CompileError } from "../compile-error";
import { AstNode } from "../compiler-interfaces/ast-node";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";

export class EmptyAsn implements AstNode {
  private constructor(public readonly fieldId: string) {}
  indent(): string {
    return "";
  }

  items: AstNode[] = [];

  id = "";

  symbolScope = SymbolScope.unknown;

  compileErrors: CompileError[] = [];

  compile(): string {
    return ``;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  get value() {
    return EmptyAsn.Instance;
  }

  toString() {
    return "";
  }

  isEmpty = true;

  static Instance: EmptyAsn = new EmptyAsn("");
}
