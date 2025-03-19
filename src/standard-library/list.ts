import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOption,
  ElanBoolean,
  ElanClass,
  elanClass,
  elanClassType,
  ElanFloat,
  elanFunction,
  elanFuncType,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanT1,
  ElanT2,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import {
  filterHelper,
  mapHelper,
  maxByHelper,
  minByHelper,
  reduceHelper,
  sortByHelper,
  withAppendHelper,
  withInsertAtHelper,
  withPutAtHelper,
  withRemoveAllHelper,
  withRemoveAtHelper,
  withRemoveFirstHelper,
} from "./data-structure-helpers";

@elanClass(ClassOption.list, [ElanT1], [], [], [], "List")
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

  @elanProcedure(["index", "value"])
  putAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safeListSet(this.contents, index, value);
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
  appendList(@elanClassType(List) listB: List<T1>) {
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
  indexOfItem(
    @elanGenericParamT1Type()
    item: T1,
  ): number {
    return this.system!.elanIndexOf(this.contents, item);
  }

  @elanFunction(["item"], FunctionOptions.pure)
  contains(@elanGenericParamT1Type() item: T1): boolean {
    return this.indexOfItem(item) !== -1;
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List))
  async filter(
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1) => Promise<boolean>,
  ): Promise<List<T1>> {
    return this.system!.initialise(
      new List(await filterHelper(this.contents as never[], predicate)),
    );
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List, [ElanT2]))
  async map<T2>(
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1) => Promise<T2>,
  ): Promise<List<T2>> {
    return this.system!.initialise(
      new List<T2>(
        await mapHelper(
          this.contents as never[],
          predicate as unknown as (value: never) => Promise<never>,
        ),
      ),
    );
  }

  @elanFunction(["initialValue", "lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT2)
  async reduce<T2>(
    @elanGenericParamT2Type() initValue: T2,
    @elanFuncType([ElanT2, ElanT1], ElanT2)
    predicate: (s: T2, value: T1) => Promise<T2>,
  ): Promise<T2> {
    return reduceHelper(
      this.contents as never[],
      initValue as never,
      predicate as unknown as (s: never, value: never) => Promise<never>,
    );
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT1)
  async maxBy(
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    return maxByHelper(
      this.contents as never[],
      predicate as unknown as (value: never) => Promise<never>,
      this.system!,
    );
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT1)
  async minBy(
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    return minByHelper(
      this.contents as never[],
      predicate as unknown as (value: never) => Promise<never>,
      this.system!,
    );
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List))
  async sortBy(
    @elanFuncType([ElanT1, ElanT1], ElanInt)
    predicate: (a: T1, b: T1) => Promise<number>,
  ): Promise<List<T1>> {
    return sortByHelper(this.contents as never[], predicate, this.system!) as unknown as Promise<
      List<T1>
    >;
  }

  @elanFunction([], FunctionOptions.pure, ElanT1)
  head(): T1 {
    return this.safeIndex(0);
  }

  async asString() {
    const contents = await this.system?.asString(this.contents);
    return `[${contents}]`;
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

    return this.system?.initialise(new List(r));
  }

  deconstructList(): [T1, List<T1>] {
    const [hd, ...tl] = this.contents;
    return [hd, this.system!.initialise(new List(tl))];
  }

  equals(other: unknown) {
    if (other instanceof List) {
      if (this.contents.length === other.contents.length) {
        return this.contents.every((c, i) => this.system?.equals(c, other.contents[i]));
      }
    }
    return false;
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withAppend(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.system!.initialise(new List(withAppendHelper(this.contents as [], value as never)));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withPrepend(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.withInsert(0, value);
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withPut(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    return this.system!.initialise(
      new List(withPutAtHelper(this.contents as [], index, value as never)),
    );
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withInsert(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    return this.system!.initialise(
      new List(withInsertAtHelper(this.contents as [], index, value as never)),
    );
  }

  @elanFunction(["index"], FunctionOptions.pure, ElanClass(List))
  withRemoveAt(@elanIntType() index: number): List<T1> {
    return this.system!.initialise(new List(withRemoveAtHelper(this.contents as [], index)));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(List))
  withRemoveFirst(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.system!.initialise(
      new List(withRemoveFirstHelper(this.contents as [], value as never, this.system!)),
    );
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(List))
  withRemoveAll(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.system!.initialise(
      new List(withRemoveAllHelper(this.contents as [], value as never, this.system!)),
    );
  }



}
