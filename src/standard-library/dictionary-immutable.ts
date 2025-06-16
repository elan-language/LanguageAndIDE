import {
  ClassOption,
  ElanBoolean,
  ElanClass,
  elanClass,
  ElanClassName,
  elanFunction,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanT1,
  ElanT2,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { ListImmutable } from "./list-immutable";

@elanClass(ClassOption.dictionaryImmutable, [ElanT1, ElanT2])
export class DictionaryImmutable<T1, T2> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new DictionaryImmutable();
  }

  async _initialise() {
    return this;
  }

  constructor(dict?: [T1, T2][]) {
    this.contents = dict ? new Map<T1, T2>(dict) : new Map<T1, T2>();
  }

  contents: Map<T1, T2>;

  private system?: System;

  findRealKey(key: T1) {
    for (const rk of this.contents.keys()) {
      if (this.system!.equals(key, rk)) {
        return rk;
      }
    }

    return key;
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanClass(DictionaryImmutable))
  withRemoveAt(@elanGenericParamT1Type() key: T1) {
    const rk = this.findRealKey(key);
    const newDict = new Map<T1, T2>(this.contents);
    newDict.delete(rk);
    return this.system!.initialise(new DictionaryImmutable<T1, T2>([...newDict.entries()]));
  }

  @elanFunction(["key", "value"], FunctionOptions.pure, ElanClass(DictionaryImmutable))
  withPut(@elanGenericParamT1Type() key: T1, @elanGenericParamT2Type() value: T2) {
    const rk = this.findRealKey(key);
    const newDict = new Map<T1, T2>(this.contents);
    newDict.set(rk, value);
    return this.system!.initialise(new DictionaryImmutable<T1, T2>([...newDict.entries()]));
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ListImmutable, [ElanT1]))
  keys(): ListImmutable<T1> {
    const lst = [...this.contents.keys()];
    return this.system!.initialise(new ListImmutable<T1>(lst));
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ListImmutable, [ElanT2]))
  values(): ListImmutable<T2> {
    const lst = [...this.contents.values()];
    return this.system!.initialise(new ListImmutable<T2>(lst));
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanBoolean)
  hasKey(@elanGenericParamT1Type() key: T1): boolean {
    const rk = this.findRealKey(key);
    return this.contents.has(rk);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("Dictionary"))
  asDictionary() {
    return this.system!.dictionaryImmutableAsDictionary(this);
  }

  async asString() {
    const items: string[] = [];
    for (const k of this.contents.keys()) {
      const kStr = await this.system!.asString(k);
      const vStr = await this.system!.asString(this.contents.get(k));
      items.push(`${kStr}:${vStr}`);
    }
    return `{${items.join(", ")}}`;
  }

  safeIndex(key: T1) {
    const rk = this.findRealKey(key);
    if (!this.contents.has(rk)) {
      this.system!.throwKeyError(key);
    }

    return this.contents.get(rk);
  }

  equals(other: unknown) {
    if (other instanceof DictionaryImmutable) {
      if (this.contents.size === other.contents.size) {
        return this.contents
          .keys()
          .every((k) => this.system!.equals(this.contents.get(k), other.contents.get(k)));
      }
    }
    return false;
  }
}
