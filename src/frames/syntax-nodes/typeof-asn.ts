import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class TypeOfAsn extends AbstractAstNode {
  constructor(
    public readonly ast: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];

    return `"${this.ast.symbolType().name}"`;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return this.ast.symbolType().toString();
  }
}
