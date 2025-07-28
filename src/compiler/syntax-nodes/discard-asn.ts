import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class DiscardAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    return "";
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    return this.id;
  }
}
