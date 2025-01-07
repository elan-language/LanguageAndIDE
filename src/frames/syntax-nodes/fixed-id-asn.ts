import { CompileError } from "../compile-error";
import { AstIdNode } from "../interfaces/ast-id-node";
import { globalKeyword, libraryKeyword } from "../keywords";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class FixedIdAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
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
