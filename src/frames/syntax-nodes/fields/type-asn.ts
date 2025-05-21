import { isAstType } from "../../frame-helpers";
import { AstNode } from "../../interfaces/ast-node";
import { AbstractAstNode } from "../abstract-ast-node";
import { EmptyAsn } from "../empty-asn";

export class TypeFieldAsn extends AbstractAstNode {
  isParseByNodes = true;
  constructor(readonly fieldId: string) {
    super();
  }

  type: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    const astNode = this.type;
    if (isAstType(astNode)) {
      return astNode.compileToEmptyObjectCode();
    }
    return astNode.compile();
  }

  symbolType() {
    return this.type.symbolType();
  }
}
