import { mustBeKnownCompilerDirective } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../frame-interfaces/scope";
import { StringType } from "../symbols/string-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class CommentAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly value: string,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    if (this.value.startsWith("[")) {
      mustBeKnownCompilerDirective("", this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return "";
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return `"${this.value}"`;
  }
}
