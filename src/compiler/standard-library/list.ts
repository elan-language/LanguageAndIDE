import {
  ClassOption,
  ElanBoolean,
  ElanClass,
  elanClass,
  ElanClassName,
  elanClassType,
  ElanFloat,
  elanFunction,
  elanFuncType,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanString,
  ElanT1,
  ElanT2,
  ElanT2Constrained,
  FunctionOptions,
} from "../../elan-type-annotations";
import { System } from "../../system";
import {
  filterHelper,
  mapHelper,
  maxByHelper,
  minByHelper,
  reduceHelper,
  sortByHelper,
  withAppendHelper,
  withAppendListHelper,
  withInsertHelper,
  withPutHelper,
  withRemoveAllHelper,
  withRemoveAtHelper,
  withRemoveFirstHelper,
} from "./data-structure-helpers";

@elanClass(ClassOption.list, [ElanT1], [], [], [])
export class List<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new List();
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

  public read(index: number): T1 {
    return this.contents[index];
  }

  @elanProcedure(["index", "value"])
  put(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safeListSet(this.contents, index, value);
  }

  @elanProcedure(["index", "value"])
  insert(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
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
  appendList<T2 extends T1>(@elanClassType(List, [ElanT2Constrained(ElanT1)]) listB: List<T2>) {
    this.contents.push(...listB.contents);
  }

  @elanProcedure(["other"])
  prepend(@elanGenericParamT1Type() value: T1) {
    this.contents.unshift(value);
  }

  @elanProcedure(["other"])
  prependList(@elanClassType(List) listB: List<T1>) {
    this.contents.unshift(...listB.contents);
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction(["item"], FunctionOptions.pure, ElanInt)
  indexOf(
    @elanGenericParamT1Type()
    item: T1,
  ): number {
    return this.system!.elanIndexOf(this.contents, item);
  }

  @elanFunction(["item"], FunctionOptions.pure)
  contains(@elanGenericParamT1Type() item: T1): boolean {
    return this.indexOf(item) !== -1;
  }

  newList<T>(newContents: T[]) {
    return this.system!.initialise(new List(newContents));
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List))
  async filter(
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1) => Promise<boolean>,
  ): Promise<List<T1>> {
    return this.newList(await filterHelper(this.contents, predicate));
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List, [ElanT2]))
  async map<T2>(
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1) => Promise<T2>,
  ): Promise<List<T2>> {
    return this.newList(await mapHelper(this.contents, predicate));
  }

  @elanFunction(["initialValue", "lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT2)
  async reduce<T2>(
    @elanGenericParamT2Type() initValue: T2,
    @elanFuncType([ElanT2, ElanT1], ElanT2)
    predicate: (s: T2, value: T1) => Promise<T2>,
  ): Promise<T2> {
    return reduceHelper(this.contents, initValue, predicate);
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT1)
  async maxBy(
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    return maxByHelper(this.contents, predicate, this.system!);
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT1)
  async minBy(
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    return minByHelper(this.contents, predicate, this.system!);
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List))
  async sortBy(
    @elanFuncType([ElanT1, ElanT1], ElanInt)
    predicate: (a: T1, b: T1) => Promise<number>,
  ): Promise<List<T1>> {
    return this.newList(await sortByHelper(this.contents, predicate, this.system!));
  }

  @elanFunction([], FunctionOptions.pure, ElanT1)
  head(): T1 {
    return this.safeIndex(0);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(List))
  tail(): List<T1> {
    const [_, ...tl] = this.contents;
    return this.system!.initialise(new List(tl));
  }

  async asString() {
    const items: string[] = [];
    for (const i of this.contents) {
      const s = await this.system!.asString(i);
      items.push(s);
    }
    return `[${items.join(", ")}]`;
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

    return this.system!.initialise(new List(r));
  }

  deconstructList(): [T1, List<T1>] {
    const [hd, ...tl] = this.contents;
    return [hd, this.system!.initialise(new List(tl))];
  }

  equals(other: unknown) {
    if (other instanceof List) {
      if (this.contents.length === other.contents.length) {
        return this.contents.every((c, i) => this.system!.equals(c, other.contents[i]));
      }
    }
    return false;
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withAppend(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.newList(withAppendHelper(this.contents, value));
  }

  @elanFunction(["toAppend"], FunctionOptions.pure, ElanClass(List))
  withAppendList(@elanClassType(List) toAppend: List<T1>): List<T1> {
    return this.newList(withAppendListHelper(this.contents, toAppend.contents));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withPrepend(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.withInsert(0, value);
  }

  @elanFunction(["toPrepend"], FunctionOptions.pure, ElanClass(List))
  withPrependList(@elanClassType(List) toPrepend: List<T1>): List<T1> {
    return toPrepend.withAppendList(this);
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withPut(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    return this.newList(withPutHelper(this.contents, index, value));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withInsert(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    return this.newList(withInsertHelper(this.contents, index, value));
  }

  @elanFunction(["index"], FunctionOptions.pure, ElanClass(List))
  withRemoveAt(@elanIntType() index: number): List<T1> {
    return this.newList(withRemoveAtHelper(this.contents, index));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(List))
  withRemoveFirst(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.newList(withRemoveFirstHelper(this.contents, value, this.system!));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(List))
  withRemoveAll(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.newList(withRemoveAllHelper(this.contents, value, this.system!));
  }

  @elanFunction(["separator"], FunctionOptions.pureAsync, ElanString)
  async join(separator: string): Promise<string> {
    const asStrings: string[] = await mapHelper(
      this.contents,
      async (i) => await this.system!.asString(i),
    );
    return asStrings.join(separator);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("ListImmutable"))
  asListImmutable() {
    return this.system!.listAsListImmutable(this);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("ElanSet"))
  asSet() {
    return this.system!.listAsSet(this);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("ElanArray"))
  asArray() {
    return this.system!.listAsArray(this);
  }
}
