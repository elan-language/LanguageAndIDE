import { CompileError } from "../compile-error";
import { mustBeKnownCompilerDirective } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class CommentAsn extends AbstractAstNode implements AstNode {
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
    this.compileErrors = [];

    if (this.value.startsWith("[")) {
      mustBeKnownCompilerDirective("", this.compileErrors, this.fieldId);
    }

    return "";
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return `"${this.value}"`;
  }
}
