import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { RegExType } from "../symbols/regex-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralRegExAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly rawValue: string,
    public readonly fieldId: string,
  ) {
    super();
    const trimmed = rawValue.trim();
    this.value = new RegExp(trimmed);
  }

  value: RegExp;

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
