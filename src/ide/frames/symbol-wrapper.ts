import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import {
  isAbstractTypeName,
  isByLanguageSymbol,
  isConcreteTypeName,
  isFunction,
  isGenericClass,
  isId,
  isMemberOnFieldsClass,
  isNotInheritableClass,
  isProcedure,
  isProperty,
  isTypeSymbol,
} from "../../compiler/symbols/symbol-helpers";
import { TerminalSymbol } from "../../compiler/syntax-nodes/terminal-symbol";
import { File } from "./frame-interfaces/file";
import { KeywordCompletion } from "./symbol-completion-helpers";

export class SymbolWrapper {
  constructor(
    private readonly wrapped: ElanSymbol | KeywordCompletion,
    private readonly scope: Scope,
    private readonly file: File,
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
    if (this.name === "") {
      return this.name;
    }
    if (this.isKeyword) {
      return this.name;
    }

    const symbol = this.wrapped as ElanSymbol;

    if (isProperty(symbol) && isMemberOnFieldsClass(symbol, this.scope)) {
      const thisInstance = this.file.language().mapTerminalSymbol(TerminalSymbol.ThisInstance);
      return `${thisInstance}.${symbol.symbolId}`;
    }

    return this.langSpecificTypeName(symbol);
  }

  langSpecificTypeName(symbol: ElanSymbol): string {
    if (isByLanguageSymbol(symbol)) {
      return symbol.toLanguage(this.file.language()).symbolId;
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

    if (isTypeSymbol(symbol)) {
      let toInsert = this.langSpecificTypeName(symbol);
      if (isGenericClass(symbol)) {
        const lang = this.file.language();
        toInsert += lang.mapTerminalSymbol(TerminalSymbol.GenericStart);
      }
      return toInsert;
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
      const thisInstance = this.file.language().mapTerminalSymbol(TerminalSymbol.ThisInstance);
      return `${thisInstance}.${symbol.symbolId}`;
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
