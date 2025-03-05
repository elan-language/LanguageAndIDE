import {
  ClassOptions,
  ElanBoolean,
  elanClass,
  ElanClassTypeDescriptor,
  ElanDictionaryImmutable,
  elanDictionaryImmutableType,
  elanFunction,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanT1,
  ElanT2,
  FunctionOptions,
} from "../elan-type-annotations";
import { hasHiddenType } from "../has-hidden-type";
import { System } from "../system";
import { List } from "./list";

@elanClass(ClassOptions.concrete, [ElanDictionaryImmutable(ElanT1, ElanT2)])
export class DictionaryImmutable<_T1, T2> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new DictionaryImmutable();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    this.contents = {};
  }

  private contents: { [key: string]: T2 };

  private system?: System;

  @elanFunction(["key"], FunctionOptions.pure, ElanDictionaryImmutable(ElanT1, ElanT2))
  withRemoveAtKey(
    @elanDictionaryImmutableType(ElanT1, ElanT2) @elanGenericParamT1Type() key: string,
  ) {
    const newDict = { ...this.contents };
    (newDict as unknown as hasHiddenType)._type = (this.contents as unknown as hasHiddenType)._type;
    delete newDict[key];
    return newDict;
  }

  @elanFunction(["", "key", "value"], FunctionOptions.pure, ElanDictionaryImmutable(ElanT1, ElanT2))
  withPutAtKey(@elanGenericParamT1Type() key: string, @elanGenericParamT2Type() value: T2) {
    const newDict = { ...this.contents };
    newDict[key] = value;
    (newDict as unknown as hasHiddenType)._type = "DictionaryImmutable";
    return newDict;
  }

  @elanFunction([], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  keys(): string[] {
    const lst = Object.getOwnPropertyNames(this.contents).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction([], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  values(): T2[] {
    const lst = this.keys().map((k) => this.contents[k]);
    (lst as unknown as hasHiddenType)._type = `List`;
    return lst;
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanBoolean)
  hasKey(@elanGenericParamT1Type() key: string): boolean {
    return this.keys().includes(key);
  }
}
