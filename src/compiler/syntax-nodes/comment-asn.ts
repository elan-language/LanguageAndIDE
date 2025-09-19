import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { StringType } from "../../compiler/symbols/string-type";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
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
