import { IntType } from "../symbols/int-type";
import { FloatType } from "../symbols/number-type";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";

export class LiteralIntAsn extends AbstractAstNode implements AstNode {
  constructor(
    rawValue: string,
    public readonly fieldId: string,
  ) {
    super();
    this.value = parseInt(rawValue.trim());
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];
    return this.value.toString();
  }

  value: number;

  symbolType() {
    return IntType.Instance;
  }

  toString() {
    return this.value.toString();
  }
}
