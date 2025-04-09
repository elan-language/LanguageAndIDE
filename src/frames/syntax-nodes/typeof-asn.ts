import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { TypeType } from "../symbols/type-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { TypeAsn } from "./type-asn";

export class TypeofAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly type: TypeAsn,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.type.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];

    return `"${this.type.symbolType().name}"`;
  }

  symbolType() {
    return new TypeType(this.type.symbolType());
  }

  toString() {
    return `${this.type}`;
  }
}
