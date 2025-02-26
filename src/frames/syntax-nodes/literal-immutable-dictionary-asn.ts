import { CompileError } from "../compile-error";
import {
  mustBeAssignableType,
  mustBeImmutableGenericType,
  mustHaveUniqueKeys,
} from "../compile-rules";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { DictionaryImmutableType } from "../symbols/dictionary-immutable-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { KvpAsn } from "./kvp-asn";

export class LiteralDictionaryImmutableAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly list: AstCollectionNode,
    public readonly fieldId: string,
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
      mustBeAssignableType(ofKeyType, i.keySymbolType(), this.compileErrors, this.fieldId);
      mustBeAssignableType(ofValueType, i.symbolType(), this.compileErrors, this.fieldId);
    }

    const st = this.symbolType();
    mustBeImmutableGenericType(st, ofKeyType, this.compileErrors, this.fieldId);
    mustBeImmutableGenericType(st, ofValueType, this.compileErrors, this.fieldId);

    const itemList = this.list.items.map((p) => `${p.compile()}`).join(", ");
    return `system.dictionaryImmutable({${itemList}})`;
  }

  symbolType() {
    const first = this.list.items[0] as KvpAsn | undefined;
    if (first) {
      return new DictionaryImmutableType(first.keySymbolType(), first.symbolType());
    }
    return new DictionaryImmutableType(UnknownType.Instance, UnknownType.Instance);
  }

  toString() {
    return `{${this.list}}`;
  }
}
