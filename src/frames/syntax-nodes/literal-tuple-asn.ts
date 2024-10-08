import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { TupleType } from "../symbols/tuple-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralTupleAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.items) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];
    const it = this.items.map((p) => p.compile()).join(", ");
    return `system.tuple([${it}])`;
  }

  symbolType() {
    return new TupleType(this.items.map((i) => i.symbolType()));
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `(${it})`;
  }
}
