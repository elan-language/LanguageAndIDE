import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { mustNotBeEnum } from "../compile-rules";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class InterpolatedAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly body: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    const bodySt = this.body.symbolType();

    mustNotBeEnum(bodySt, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `\${await _stdlib.toString(${this.body.compile()})}`;
  }

  symbolType() {
    return this.body.symbolType();
  }

  toString() {
    return `${this.body}`;
  }
}
