import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";

export class ImageAsn implements AstNode {
  constructor(public readonly fieldId: string) {}

  items: AstNode[] = [];

  id = "";

  symbolScope = SymbolScope.unknown;

  compileErrors: CompileError[] = [];

  aggregateCompileErrors(): CompileError[] {
    return [];
  }

  compile(): string {
    return ``;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  get value() {
    return ImageAsn.Instance;
  }

  toString() {
    return "";
  }

  isEmpty = true;

  static Instance: ImageAsn = new ImageAsn("");
}
