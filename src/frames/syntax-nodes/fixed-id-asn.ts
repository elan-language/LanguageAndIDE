import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";
import { globalKeyword, libraryKeyword } from "../keywords";

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
    return this.id === globalKeyword ? "" : this.id === libraryKeyword ? "_stdlib" : this.id;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    return this.id;
  }
}
