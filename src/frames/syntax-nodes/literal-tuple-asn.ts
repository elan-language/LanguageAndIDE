import { AstNode } from "../compiler-interfaces/ast-node";
import { TupleType } from "../symbols/tuple-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralTupleAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
  ) {
    super();
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
