import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { RegexType } from "../symbols/regex-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralRegExAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly rawValue: string,
    public readonly fieldId: string,
  ) {
    super();
    const trimmed = rawValue.trim();
    const r = trimmed.substring(1, trimmed.length - 1); //Remove delimiting slashes as RegExp will add them back automatically
    this.value = new RegExp(r);
  }

  value: RegExp;

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    return `${this.value}`;
  }

  symbolType() {
    return RegexType.Instance;
  }

  toString() {
    return `${this.value}`;
  }
}
