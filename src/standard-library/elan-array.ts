import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOptions,
  ElanClass,
  elanClass,
  elanClassType,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { List } from "./list";
import { ElanSet } from "./set";

@elanClass(ClassOptions.array, [ElanT1], [], [], [], "Array")
export class ElanArray<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray();
  }

  async _initialise() {
    return this;
  }

  constructor(arr?: T1[]) {
    this.contents = arr ? [...arr] : [];
  }

  private contents: T1[];

  private system?: System;

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => {
        if (index < this.contents.length) {
          return { value: this.contents[index++], done: false };
        } else {
          return { done: true };
        }
      },
    } as { next: () => { value: T1; done: boolean } };
  }

  @elanProcedure(["index", "value"])
  putAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safeArraySet(this.contents, index, value);
  }

  @elanProcedure(["column", "row"])
  putAt2D(
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system!.safeArraySet(this.contents[col] as T1[], row, value);
  }

  @elanProcedure(["index", "value"])
  insertAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.contents.splice(index, 0, value);
  }

  @elanProcedure(["index"])
  removeAt(@elanIntType() index: number) {
    this.contents.splice(index, 1);
  }

  @elanProcedure(["value"])
  removeFirst(@elanGenericParamT1Type() value: T1) {
    const index = this.system!.elanIndexOf(this.contents, value);
    if (index > -1) {
      this.contents.splice(index, 1);
    }
  }

  @elanProcedure(["value"])
  removeAll(@elanGenericParamT1Type() value: T1) {
    let index = this.system!.elanIndexOf(this.contents, value);
    while (index > -1) {
      this.contents.splice(index, 1);
      index = this.system!.elanIndexOf(this.contents, value);
    }
  }

  @elanProcedure(["value"])
  append(@elanGenericParamT1Type() value: T1) {
    this.contents.push(value);
  }

  @elanProcedure(["other"])
  appendArray(@elanClassType(ElanArray) listB: ElanArray<T1>) {
    this.contents.push(...listB.contents);
  }

  @elanProcedure(["other"])
  prepend(@elanGenericParamT1Type() value: T1) {
    this.contents.unshift(value);
  }

  @elanProcedure(["other"])
  prependArray(@elanClassType(ElanArray) listB: ElanArray<T1>) {
    this.contents.unshift(...listB.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction(["item"], FunctionOptions.pure, ElanInt)
  indexOfItem(
    @elanGenericParamT1Type()
    item: T1,
  ): number {
    return this.system!.elanIndexOf(this.contents, item);
  }

  @elanFunction(["item"], FunctionOptions.pure)
  contains(@elanGenericParamT1Type() item: T1): boolean {
    return this.contents.includes(item);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  asList(): List<T1> {
    const list = [...this.contents];
    return this.system!.initialise(new List<T1>(list));
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ElanSet))
  asSet(): ElanSet<T1> {
    const set = this.system!.initialise(new ElanSet<T1>());
    return set.addFromArray(new ElanArray([...this.contents]));
  }

  async asString() {
    return `[${await this.system?.asString(this.contents)}]`;
  }

  safeIndex(index: number) {
    const r = this.contents[index];

    if (r === undefined) {
      this.system!.throwRangeError(this.contents, index);
    }

    return r;
  }

  safeSlice(index1: number | undefined, index2: number | undefined) {
    if (index1 && index1 < 0) {
      this.system!.throwRangeError(this.contents, index1);
    }

    if (index2 && index2 < 0) {
      this.system!.throwRangeError(this.contents, index2);
    }

    const r = this.contents.slice(index1, index2);

    if (r === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    return this.system?.initialise(new ElanArray(r));
  }

  deconstructList(): [T1, ElanArray<T1>] {
    const [hd, ...tl] = this.contents;
    return [hd, this.system!.initialise(new ElanArray(tl))];
  }
}
