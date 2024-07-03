import { ImmutableListType } from "../symbols/immutable-list-type";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { mustBeCompatibleType } from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";

export class LiteralImmutableListAsn extends AbstractAstNode implements AstCollectionNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.items) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];
    const ofType = this.items[0]?.symbolType();

    for (const i of this.items) {
      mustBeCompatibleType(ofType, i.symbolType(), this.compileErrors, this.fieldId);
    }

    const it = this.items.map((p) => p.compile()).join(", ");
    return `system.immutableList([${it}])`;
  }

  symbolType() {
    const ofType = this.items[0]?.symbolType();
    if (ofType) {
      return new ImmutableListType(ofType);
    }
    return new ImmutableListType(UnknownType.Instance);
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `{${it}}`;
  }
}
