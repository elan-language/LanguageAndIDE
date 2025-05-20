import { isAstType } from "../../frame-helpers";
import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { AbstractAstNode } from "../abstract-ast-node";

export class TypeAsn extends AbstractAstNode {
  isParseByNodes = true;
  constructor(
    private readonly type: AstNode,
    private readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

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
