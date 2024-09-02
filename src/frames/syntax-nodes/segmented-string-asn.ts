import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { StringType } from "../symbols/string-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class SegmentedStringAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly segments: AstNode[],
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.segments) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];
    return `\`${this.segments.map((s) => s.compile()).join("")}\``;
  }

  symbolType() {
    return StringType.Instance;
  }

  toString() {
    return this.segments.map((s) => `${s}`).join("");
  }
}
