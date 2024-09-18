import { CompileError } from "../compile-error";
import { mustBeCompatibleType } from "../compile-rules";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { ArrayType } from "../symbols/array-list-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralArrayAsn extends AbstractAstNode implements AstCollectionNode {
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
    return `system.literalArray([${it}])`;
  }

  symbolType() {
    const ofType = this.items[0]?.symbolType();
    if (ofType) {
      return new ArrayType(ofType);
    }
    return new ArrayType(UnknownType.Instance);
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `[${it}]`;
  }
}
