import { propertyKeyword } from "../../ide/frames/keywords";
import { KeywordCompletion } from "../../ide/frames/symbol-completion-helpers";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { EmptyAsn } from "../syntax-nodes/empty-asn";
import {
  isAbstractTypeName,
  isCallStatement,
  isConcreteTypeName,
  isFunction,
  isGenericClass,
  isId,
  isMemberOnFieldsClass,
  isNotInheritableClass,
  isProcedure,
  isProperty,
} from "./symbol-helpers";

export class SymbolWrapper {
  constructor(
    private readonly wrapped: ElanSymbol | KeywordCompletion,
    private readonly scope: Scope,
  ) {
    if (wrapped instanceof KeywordCompletion) {
      this.name = wrapped.keyword;
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

    if (isProperty(symbol) && isMemberOnFieldsClass(symbol, this.scope)) {
      return `${propertyKeyword}.${symbol.symbolId}`;
    }

    return this.name;
  }

  get class() {
    if (this.isKeyword) {
      return " keyword";
    }

    const symbol = this.wrapped as ElanSymbol;

    // order is important

    if (isConcreteTypeName(symbol) || isAbstractTypeName(symbol) || isNotInheritableClass(symbol)) {
      return " type";
    }

    if (isFunction(symbol) || isProcedure(symbol)) {
      return " method";
    }

    if (isId(symbol)) {
      return " id";
    }

    return "";
  }

  get insertedText() {
    if (this.wrapped instanceof KeywordCompletion) {
      const postfix = this.wrapped.dotAfter
        ? "."
        : this.wrapped.spaceAfter
          ? " "
          : this.wrapped.openBracketAfter
            ? "("
            : "";
      return `${this.name}${postfix}`;
    }

    const symbol = this.wrapped as ElanSymbol;

    if (isGenericClass(symbol)) {
      return `${this.name}<of `;
    }

    if (isFunction(symbol)) {
      return `${this.name}(`;
    }

    if (isProcedure(symbol)) {
      return `${this.name}`;
    }

    if (isConcreteTypeName(symbol) || isAbstractTypeName(symbol)) {
      return `${this.name}`;
    }

    if (isMemberOnFieldsClass(symbol, this.scope)) {
      return `${propertyKeyword}.${symbol.symbolId}`;
    }

    if (isCallStatement(this.scope) && this.scope.args instanceof EmptyAsn) {
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
