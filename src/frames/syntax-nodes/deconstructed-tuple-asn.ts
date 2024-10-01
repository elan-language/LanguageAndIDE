import { CompileError } from "../compile-error";
import { AstIdNode } from "../interfaces/ast-id-node";
import { TupleType } from "../symbols/tuple-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class DeconstructedTupleAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly items: AstIdNode[],
    public readonly fieldId: string,
  ) {
    super();
  }

  get id() {
    const ids = this.items.map((i) => i.id).join(",");
    return `${ids}`;
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
    return `[${it}]`;
  }

  symbolType() {
    return new TupleType(this.items.map((i) => i.symbolType()));
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `${it}`;
  }
}
