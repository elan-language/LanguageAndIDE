import {
  ClassOptions,
  ElanBoolean,
  ElanClass,
  ElanDictionaryImmutable,
  ElanT1,
  ElanT2,
  FunctionOptions,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  elanProcedure,
} from "../elan-type-annotations";
import { hasHiddenType } from "../has-hidden-type";
import { System } from "../system";
import { List } from "./list";

@elanClass(ClassOptions.concrete, [ElanDictionaryImmutable(ElanT1, ElanT2)])
export class Dictionary<_T1, T2> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Dictionary();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    this.contents = {};
  }

  private contents: { [key: string]: T2 };

  private system?: System;

  @elanProcedure(["key"])
  removeAtKey(@elanGenericParamT1Type() key: string) {
    delete this.contents[key];
  }

  @elanProcedure(["", "key", "value"])
  putAtKey(
    dict: { [key: string]: T2 },
    @elanGenericParamT1Type() key: string,
    @elanGenericParamT2Type() value: T2,
  ) {
    this.system!.safeDictionarySet(dict, key, value);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  keys(): string[] {
    const lst = Object.getOwnPropertyNames(this.contents).filter((s) => s !== "_type");
    (lst as unknown as hasHiddenType)._type = "List";
    return lst;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
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
