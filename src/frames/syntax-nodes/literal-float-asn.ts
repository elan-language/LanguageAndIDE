import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { FloatType } from "../symbols/float-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralFloatAsn extends AbstractAstNode implements AstNode {
  constructor(
    rawValue: string,
    public readonly fieldId: string,
  ) {
    super();
    this.value = parseFloat(rawValue.trim());
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
    return FloatType.Instance;
  }

  toString() {
    return this.value.toString();
  }
}
