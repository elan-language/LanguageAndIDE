import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralStringAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly value: string,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    return `${this.value}`;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return this.value;
  }
}
