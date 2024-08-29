import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { RegExType } from "../symbols/regex-type";

export class LiteralRegExAsn extends AbstractAstNode implements AstNode {
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
    return RegExType.Instance;
  }

  toString() {
    return this.value;
  }
}
