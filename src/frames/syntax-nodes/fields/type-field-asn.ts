import { isAstType } from "../../frame-helpers";
import { AstIdNode } from "../../interfaces/ast-id-node";
import { AstNode } from "../../interfaces/ast-node";
import { AbstractAstNode } from "../abstract-ast-node";
import { EmptyAsn } from "../empty-asn";
import { getId } from "../../compile-rules";

export class TypeFieldAsn extends AbstractAstNode implements AstIdNode {
  isParseByNodes = true;
  constructor(readonly fieldId: string) {
    super();
  }

  get id() {
    return getId(this.type);
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
