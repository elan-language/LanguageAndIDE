import { Deprecation, DeprecationSeverity } from "../compiler-interfaces/elan-type-interfaces";
import {
  ClassOption,
  ElanBoolean,
  ElanClass,
  ElanClassName,
  ElanFloat,
  ElanInt,
  ElanString,
  ElanT1,
  ElanT2,
  FunctionOptions,
  elanClass,
  elanClassType,
  elanDeprecated,
  elanFuncType,
  elanFunction,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  elanIntType,
} from "../elan-type-annotations";
import { System } from "../system";
import {
  filterHelper,
  mapHelper,
  maxByHelper,
  minByHelper,
  orderByHelper,
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

@elanClass(ClassOption.listImmutable, [ElanT1], [], [], [])
export class ListImmutable<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ListImmutable();
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

  newList<T>(newContents: T[]) {
    return this.system!.initialise(new ListImmutable(newContents));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(ListImmutable))
  withAppend(@elanGenericParamT1Type() value: T1): ListImmutable<T1> {
    return this.newList(withAppendHelper(this.contents, value));
  }

  @elanFunction(["toAppend"], FunctionOptions.pure, ElanClass(ListImmutable))
  withAppendList(@elanClassType(ListImmutable) toAppend: ListImmutable<T1>): ListImmutable<T1> {
    return this.newList(withAppendListHelper(this.contents, toAppend.contents));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(ListImmutable))
  withPrepend(@elanGenericParamT1Type() value: T1): ListImmutable<T1> {
    return this.withInsert(0, value);
  }

  @elanFunction(["toPrepend"], FunctionOptions.pure, ElanClass(ListImmutable))
  withPrependList(@elanClassType(ListImmutable) toPrepend: ListImmutable<T1>): ListImmutable<T1> {
    return toPrepend.withAppendList(this);
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(ListImmutable))
  withPut(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): ListImmutable<T1> {
    return this.newList(withPutHelper(this.contents, index, value));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(ListImmutable))
  withInsert(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): ListImmutable<T1> {
    return this.newList(withInsertHelper(this.contents, index, value));
  }

  @elanFunction(["index"], FunctionOptions.pure, ElanClass(ListImmutable))
  withRemoveAt(@elanIntType() index: number): ListImmutable<T1> {
    return this.newList(withRemoveAtHelper(this.contents, index));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(ListImmutable))
  withRemoveFirst(@elanGenericParamT1Type() value: T1): ListImmutable<T1> {
    return this.newList(withRemoveFirstHelper(this.contents, value, this.system!));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(ListImmutable))
  withRemoveAll(@elanGenericParamT1Type() value: T1): ListImmutable<T1> {
    return this.newList(withRemoveAllHelper(this.contents, value, this.system!));
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

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(ListImmutable))
  async filter(
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1) => Promise<boolean>,
  ): Promise<ListImmutable<T1>> {
    return this.newList(await filterHelper(this.contents, predicate));
  }

  @elanFunction(
    ["lambdaOrFunctionRef"],
    FunctionOptions.pureAsync,
    ElanClass(ListImmutable, [ElanT2]),
  )
  async map<T2>(
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1) => Promise<T2>,
  ): Promise<ListImmutable<T2>> {
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

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(ListImmutable))
  async orderBy(
    @elanFuncType([ElanT1, ElanT1], ElanBoolean)
    predicate: (a: T1, b: T1) => Promise<boolean>,
  ): Promise<ListImmutable<T1>> {
    return this.newList(await orderByHelper(this.contents, predicate, this.system!));
  }

  @elanFunction([], FunctionOptions.pure, ElanT1)
  head(): T1 {
    return this.safeIndex(0);
  }

  @elanFunction([], FunctionOptions.pure, ElanClass(ListImmutable))
  tail(): ListImmutable<T1> {
    const [_, ...tl] = this.contents;
    return this.system!.initialise(new ListImmutable(tl));
  }

  async asString() {
    const items: string[] = [];
    for (const i of this.contents) {
      const s = await this.system!.asString(i);
      items.push(s);
    }
    return `{${items.join(", ")}}`;
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

    return this.system!.initialise(new ListImmutable(r));
  }

  deconstructList(): [T1, ListImmutable<T1>] {
    const [hd, ...tl] = this.contents;
    return [hd, this.system!.initialise(new ListImmutable(tl))];
  }

  equals(other: unknown) {
    if (other instanceof ListImmutable) {
      if (this.contents.length === other.contents.length) {
        return this.contents.every((c, i) => this.system!.equals(c, other.contents[i]));
      }
    }
    return false;
  }

  @elanFunction(["separator"], FunctionOptions.pureAsync, ElanString)
  async join(separator: string): Promise<string> {
    const asStrings: string[] = await mapHelper(
      this.contents,
      async (i) => await this.system!.asString(i),
    );
    return asStrings.join(separator);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("List"))
  asList() {
    return this.system!.listImmutableAsList(this);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("ElanSet"))
  asSet() {
    return this.system!.listImmutableAsSet(this);
  }

  @elanFunction([], FunctionOptions.pure, ElanClassName("ElanArray"))
  asArray() {
    return this.system!.listImmutableAsArray(this);
  }
}
