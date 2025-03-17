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
export class Dictionary<_T1, T2> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new Dictionary();
  }

  async _initialise() {
    return this;
  }

  constructor(dict?: { [key: string]: T2 }) {
    this.contents = dict ?? {};
  }

  private contents: { [key: string]: T2 };

  private system?: System;

  @elanProcedure(["key"])
  removeAtKey(@elanGenericParamT1Type() key: string) {
    delete this.contents[key];
  }

  @elanProcedure(["key", "value"])
  putAtKey(@elanGenericParamT1Type() key: string, @elanGenericParamT2Type() value: T2) {
    this.contents[key] = value;
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  keys(): List<string> {
    const lst = Object.getOwnPropertyNames(this.contents).filter((s) => s !== "_type");
    return this.system!.initialise(new List<string>(lst));
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  values(): List<T2> {
    const lst = Object.getOwnPropertyNames(this.contents)
      .filter((s) => s !== "_type")
      .map((k) => this.contents[k]);
    return this.system!.initialise(new List<T2>(lst));
  }

  @elanFunction(["key"], FunctionOptions.pure, ElanBoolean)
  hasKey(@elanGenericParamT1Type() key: string): boolean {
    return this.keys().contains(key);
  }

  async asString() {
    const contents = await this.system?.asString(this.contents);
    return `[${contents}]`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  safeIndex(index: any) {
    const r = this.contents[index];

    if (r === undefined) {
      this.system!.throwRangeError(this.contents, index);
    }

    return r;
  }
}
