import { isGenericClass } from "../helpers";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { propertyKeyword } from "../keywords";
import { isProperty } from "./symbol-helpers";

export class SymbolWrapper {
  constructor(private readonly wrapped: ElanSymbol | string) {
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

    if (isProperty(this.wrapped as ElanSymbol)) {
      return `${propertyKeyword}.${this.name}`;
    }

    return isGenericClass(this.wrapped as ElanSymbol) ? `${this.name}&lt;of` : this.name;
  }

  get insertedText() {
    if (this.isKeyword) {
      return this.name + " ";
    }

    // if (isGenericClass(this.wrapped)) {

    //  return `${symbol.symbolId}<of `;
    // }

    // if (isProcedure(this.wrapped, transforms())) {
    //   return s.symbolId;
    // }
    // return s.symbolId + ".";

    // if (isMemberOnFieldsClass(symbol, transforms(), this.getHolder())) {
    //   return `${propertyKeyword}.${symbol.symbolId}`;
    // }
    // if (isGenericClass(symbol)) {
    //   return `${symbol.symbolId}<of `;
    // }
    // if (isFunction(symbol, transforms())) {
    //   return symbol.symbolId + "(";
    // }
    // return symbol.symbolId;

    // if (isMemberOnFieldsClass(s, transforms(), this.getHolder())) {
    //   return `${propertyKeyword}.${s.symbolId}`;
    // }
    // return s.symbolId;

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
