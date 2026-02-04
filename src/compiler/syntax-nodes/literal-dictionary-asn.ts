import { AstCollectionNode } from "../../compiler/compiler-interfaces/ast-collection-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ReifyableSymbolType } from "../../compiler/compiler-interfaces/reifyable-symbol-type";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { DictionaryName } from "../../compiler/symbols/elan-type-names";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import {
  mustBeAssignableType,
  mustBeImmutableCollection,
  mustBeValidKeyType,
  mustHaveUniqueKeys,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { isInsideConstant } from "./ast-helpers";
import { KvpAsn } from "./kvp-asn";

export class LiteralDictionaryAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly list: AstCollectionNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    if (isInsideConstant(this.scope)) {
      mustBeImmutableCollection(false, this.compileErrors, this.fieldId);
    }

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
    mustBeValidKeyType(st, ofKeyType, this.compileErrors, this.fieldId);

    const itemList = this.list.items.map((p) => p.compile()).join(", ");

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `system.dictionary([${itemList}])`;
  }

  symbolType() {
    const globalScope = getGlobalScope(this.scope);
    const symbol = globalScope.resolveSymbol(DictionaryName, true, this.scope);
    const st = symbol.symbolType() as ReifyableSymbolType;

    const first = this.list.items[0] as KvpAsn | undefined;
    if (first) {
      return st.reify([first.keySymbolType(), first.symbolType()]);
    }

    return st.reify([UnknownType.Instance, UnknownType.Instance]);
  }

  toString() {
    return `[${this.list}]`;
  }
}
