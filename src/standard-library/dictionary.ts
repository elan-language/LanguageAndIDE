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
import { List } from "./list";

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

  @elanProcedure(["key"])
  removeAtKey(@elanGenericParamT1Type() key: T1) {
    this.contents.delete(key);
  }

  @elanProcedure(["key", "value"])
  putAtKey(@elanGenericParamT1Type() key: T1, @elanGenericParamT2Type() value: T2) {
    this.contents.set(key, value);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  keys(): List<T1> {
    const lst = [...this.contents.keys()];
    return this.system!.initialise(new List<T1>(lst));
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  values(): List<T2> {
    const lst = [...this.contents.values()];
    return this.system!.initialise(new List<T2>(lst));
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanBoolean)
  hasKey(@elanGenericParamT1Type() key: T1): boolean {
    return this.contents.has(key);
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
    if (!this.contents.has(key)) {
      this.system!.throwRangeError(this.contents, key);
    }

    return this.contents.get(key);
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
}
