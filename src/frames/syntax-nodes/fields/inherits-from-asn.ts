import { AstNode } from "../../compiler-interfaces/ast-node";
import { SymbolType } from "../../frame-interfaces/symbol-type";
import { UnknownType } from "../../symbols/unknown-type";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstCollectionNode } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";

export class InheritsFromAsn extends AbstractAstNode {
  isParseByNodes = true;
  constructor(readonly fieldId: string) {
    super();
  }

  inheritance: AstNode = EmptyAsn.Instance;

  symbolTypes(): SymbolType[] {
    if (isAstCollectionNode(this.inheritance)) {
      return this.inheritance.items.map((i) => i.symbolType());
    }

    return [];
  }

  symbolType(): SymbolType {
    return UnknownType.Instance;
  }

  compile(): string {
    this.compileErrors = [];
    return this.inheritance.compile();
  }
}
