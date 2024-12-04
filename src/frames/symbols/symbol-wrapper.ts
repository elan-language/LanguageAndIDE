import { isGenericClass } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { propertyKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";
import {
  isAbstractTypeName,
  isCallStatement,
  isConcreteTypeName,
  isFunction,
  isMemberOnFieldsClass,
  isProcedure,
  isProperty,
} from "./symbol-helpers";

export class SymbolWrapper {
  constructor(
    private readonly wrapped: ElanSymbol | string,
    private readonly transforms: Transforms,
    private readonly scope: Scope,
  ) {
    if (typeof wrapped === "string") {
      this.name = wrapped;
      this.isKeyword = true;
    } else {
      this.name = wrapped.symbolId;
      this.isKeyword = false;
    }
  }

  isKeyword: boolean;

  name: string;

  get displayName() {
    if (this.isKeyword) {
      return this.name;
    }

    const symbol = this.wrapped as ElanSymbol;

    if (isMemberOnFieldsClass(symbol, this.transforms, this.scope)) {
      return `${propertyKeyword}.${symbol.symbolId}`;
    }

    return isGenericClass(symbol) ? `${this.name}&lt;of` : this.name;
  }

  get insertedText() {
    if (this.isKeyword) {
      const postfix = this.name === propertyKeyword ? "." : " ";
      return `${this.name}${postfix}`;
    }

    const symbol = this.wrapped as ElanSymbol;

    if (isGenericClass(symbol)) {
      return `${this.name}<of `;
    }

    if (isFunction(symbol, this.transforms)) {
      return `${this.name}(`;
    }

    if (isProcedure(symbol, this.transforms)) {
      return `${this.name}`;
    }

    if (isConcreteTypeName(symbol) || isAbstractTypeName(symbol)) {
      return `${this.name}`;
    }

    if (isMemberOnFieldsClass(symbol, this.transforms, this.scope)) {
      return `${propertyKeyword}.${symbol.symbolId}`;
    }

    if (isCallStatement(this.scope)) {
      return `${this.name}.`;
    }

    return this.name;
  }

  matches(other: SymbolWrapper | undefined) {
    if (!other) {
      return false;
    }

    if (this.isKeyword && other.isKeyword) {
      return this.name === other.name;
    }

    if (!this.isKeyword && !other.isKeyword) {
      return (
        this.name === other.name &&
        (this.wrapped as ElanSymbol).symbolScope === (other.wrapped as ElanSymbol).symbolScope
      );
    }

    return false;
  }
}
