import { AstNode } from "../../interfaces/ast-node";
import { SymbolType } from "../../interfaces/symbol-type";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstCollectionNode } from "../ast-helpers";

export class InheritsFromAsn extends AbstractAstNode {
  isParseByNodes = true;
  constructor(private readonly inheritance: AstNode) {
    super();
  }

  symbolTypes(): SymbolType[] {
    if (isAstCollectionNode(this.inheritance)) {
      return this.inheritance.items.map((i) => i.symbolType());
    }

    return [];
  }

  compile(): string {
    this.compileErrors = [];
    return this.inheritance.compile();
  }
}
