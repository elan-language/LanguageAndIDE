import { AstCollectionNode } from "../compiler-interfaces/ast-collection-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class CsvAsn extends AbstractAstNode implements AstCollectionNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    const it = this.items.map((p) => p.compile()).join(", ");
    return `${it}`;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `${it}`;
  }
}
