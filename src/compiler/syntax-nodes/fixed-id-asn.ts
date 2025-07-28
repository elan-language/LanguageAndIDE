import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { globalKeyword, libraryKeyword } from "../keywords";
import { AbstractAstNode } from "./abstract-ast-node";

export class FixedIdAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    return this.id === libraryKeyword ? "_stdlib" : this.id === globalKeyword ? "global" : this.id;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    return this.id;
  }
}
