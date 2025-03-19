import {
  ClassOption,
  ElanBoolean,
  ElanClass,
  ElanT1,
  ElanT2,
  FunctionOptions,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  elanProcedure,
} from "../elan-type-annotations";
import { System } from "../system";
import { ListImmutable } from "./list-immutable";

@elanClass(ClassOption.dictionary, [ElanT1, ElanT2])
export class Dictionary<T1, T2> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Dictionary();
  }

  async _initialise() {
    return this;
  }

  constructor(dict?: [T1, T2][]) {
    this.contents = dict ? new Map<T1, T2>(dict) : new Map<T1, T2>();
  }

  private contents: Map<T1, T2>;

  private system?: System;

  findRealKey(key: T1) {
    for (const rk of this.contents.keys()) {
      if (this.system?.equals(key, rk)) {
        return rk;
      }
    }

    return key;
  }

  @elanProcedure(["key"])
  removeAtKey(@elanGenericParamT1Type() key: T1) {
    const rk = this.findRealKey(key);
    this.contents.delete(rk);
  }

  @elanProcedure(["key", "value"])
  putAtKey(@elanGenericParamT1Type() key: T1, @elanGenericParamT2Type() value: T2) {
    const rk = this.findRealKey(key);
    this.contents.set(rk, value);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ListImmutable))
  keys(): ListImmutable<T1> {
    const lst = [...this.contents.keys()];
    return this.system!.initialise(new ListImmutable<T1>(lst));
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ListImmutable))
  values(): ListImmutable<T2> {
    const lst = [...this.contents.values()];
    return this.system!.initialise(new ListImmutable<T2>(lst));
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanBoolean)
  hasKey(@elanGenericParamT1Type() key: T1): boolean {
    const rk = this.findRealKey(key);
    return this.contents.has(rk);
  }

  async asString() {
    const items: string[] = [];
    for (const k of this.contents.keys()) {
      const kStr = await this.system?.asString(k);
      const vStr = await this.system?.asString(this.contents.get(k));
      items.push(`${kStr}:${vStr}`);
    }
    return `[${items.join(", ")}]`;
  }

  safeIndex(key: T1) {
    const rk = this.findRealKey(key);
    if (!this.contents.has(rk)) {
      this.system!.throwKeyError(key);
    }

    return this.contents.get(rk);
  }

  equals(other: unknown) {
    if (other instanceof Dictionary) {
      if (this.contents.size === other.contents.size) {
        return this.contents
          .keys()
          .every((k) => this.system?.equals(this.contents.get(k), other.contents.get(k)));
      }
    }
    return false;
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanClass(Dictionary))
  withRemoveAtKey(@elanGenericParamT1Type() key: T1) {
    const rk = this.findRealKey(key);
    const newDict = new Map<T1, T2>(this.contents);
    newDict.delete(rk);
    return this.system!.initialise(new Dictionary<T1, T2>([...newDict.entries()]));
  }

  @elanFunction(["key", "value"], FunctionOptions.pure, ElanClass(Dictionary))
  withPutAtKey(@elanGenericParamT1Type() key: T1, @elanGenericParamT2Type() value: T2) {
    const rk = this.findRealKey(key);
    const newDict = new Map<T1, T2>(this.contents);
    newDict.set(rk, value);
    return this.system!.initialise(new Dictionary<T1, T2>([...newDict.entries()]));
  }
}
