import { DictionaryType } from "../symbols/dictionary-type";
import { UnknownType } from "../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { mustBeCompatibleType, mustHaveUniqueKeys } from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { KvpAsn } from "./kvp-asn";
import { AstCollectionNode } from "../interfaces/ast-collection-node";

export class LiteralDictionaryAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly list: AstCollectionNode,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.list.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    const items = this.list.items as KvpAsn[];

    const keys = items.map((kvp) => kvp.key.compile());
    mustHaveUniqueKeys(keys, this.compileErrors, this.fieldId);

    const first = items[0];

    const ofKeyType = first.keySymbolType();
    const ofValueType = first.symbolType();

    for (const i of items) {
      mustBeCompatibleType(ofKeyType, i.keySymbolType(), this.compileErrors, this.fieldId);
      mustBeCompatibleType(ofValueType, i.symbolType(), this.compileErrors, this.fieldId);
    }

    const itemList = this.list.items.map((p) => p.compile()).join(", ");
    return `system.dictionary({${itemList}})`;
  }

  symbolType() {
    const first = this.list.items[0] as KvpAsn | undefined;
    if (first) {
      return new DictionaryType(first.keySymbolType(), first.symbolType());
    }
    return new DictionaryType(UnknownType.Instance, UnknownType.Instance);
  }

  toString() {
    return `[${this.list}]`;
  }
}
