import { isGenericClass } from "../frame-helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Scope } from "../interfaces/scope";
import { Transforms } from "../interfaces/transforms";
import { propertyKeyword } from "../keywords";
import { KeywordCompletion } from "../symbol-completion-helpers";
import {
  isAbstractTypeName,
  isCallStatement,
  isConcreteTypeName,
  isFunction,
  isId,
  isMemberOnFieldsClass,
  isNotInheritableClass,
  isProcedure,
  isProperty,
} from "./symbol-helpers";

export class SymbolWrapper {
  constructor(
    private readonly wrapped: ElanSymbol | KeywordCompletion,
    private readonly transforms: Transforms,
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

    if (isProperty(symbol) && isMemberOnFieldsClass(symbol, this.transforms, this.scope)) {
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

    if (isFunction(symbol, this.transforms) || isProcedure(symbol, this.transforms)) {
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

    if (isCallStatement(this.scope) && this.scope.args.cursorPos === 0) {
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
