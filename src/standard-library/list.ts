import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOptions,
  ElanBoolean,
  ElanClass,
  elanClass,
  ElanFloat,
  elanFunction,
  elanFuncType,
  elanGenericParamT1Type,
  elanGenericParamT2Type,
  ElanInt,
  elanIntType,
  ElanT1,
  ElanT2,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

async function getPivot<T1>(x: T1, y: T1, z: T1, compare: (a: T1, b: T1) => Promise<number>) {
  if ((await compare(x, y)) < 0) {
    if ((await compare(y, z)) < 0) {
      return y;
    } else if ((await compare(z, x)) < 0) {
      return x;
    } else {
      return z;
    }
  } else if ((await compare(y, z)) > 0) {
    return y;
  } else if ((await compare(z, x)) > 0) {
    return x;
  } else {
    return z;
  }
}

// from github https://gist.github.com/kimamula/fa34190db624239111bbe0deba72a6ab
async function quickSort<T1>(
  arr: T1[],
  compare: (a: T1, b: T1) => Promise<number>,
  left = 0,
  right = arr.length - 1,
) {
  if (left < right) {
    let i = left,
      j = right,
      tmp;
    const pivot = await getPivot(arr[i], arr[i + Math.floor((j - i) / 2)], arr[j], compare);
    while (true) {
      while ((await compare(arr[i], pivot)) < 0) {
        i++;
      }
      while ((await compare(pivot, arr[j])) < 0) {
        j--;
      }
      if (i >= j) {
        break;
      }
      tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;

      i++;
      j--;
    }
    await quickSort(arr, compare, left, i - 1);
    await quickSort(arr, compare, j + 1, right);
  }
  return arr;
}

@elanClass(ClassOptions.list, [ElanT1], [], [], [], "List")
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

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withAppend(@elanGenericParamT1Type() value: T1): List<T1> {
    const newList = [...this.contents];
    newList.push(value);
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withPrepend(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.withInsertAt(0, value);
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withPutAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    const newList = [...this.contents];
    newList[index] = value;

    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, ElanClass(List))
  withInsertAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (this.contents as any).toSpliced(index, 0, value);
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["index"], FunctionOptions.pure, ElanClass(List))
  withRemoveAt(@elanIntType() index: number): List<T1> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (this.contents as any).toSpliced(index, 1);
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(List))
  withRemoveFirst(@elanGenericParamT1Type() value: T1): List<T1> {
    let newList = [...this.contents];
    const index = this.system!.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["value"], FunctionOptions.pure, ElanClass(List))
  withRemoveAll(@elanGenericParamT1Type() value: T1): List<T1> {
    let newList = [...this.contents];
    let index = this.system!.elanIndexOf(newList, value);
    while (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
      index = this.system!.elanIndexOf(newList, value);
    }
    return this.system!.initialise(new List(newList));
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

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List))
  async filter(
    @elanFuncType([ElanT1], ElanBoolean)
    predicate: (value: T1) => Promise<boolean>,
  ): Promise<List<T1>> {
    const list = [...this.contents];

    const asyncFilter = async (list: T1[], predicate: (value: T1) => Promise<boolean>) => {
      const results = await Promise.all(list.map(predicate));

      return list.filter((_v, index) => results[index]);
    };

    const result = await asyncFilter(list, predicate);

    return this.system!.initialise(new List(result));
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List, [ElanT2]))
  async map<T2>(
    @elanFuncType([ElanT1], ElanT2)
    predicate: (value: T1) => Promise<T2>,
  ): Promise<List<T2>> {
    const list = [...this.contents];

    const results = await Promise.all(list.map(predicate));

    return this.system!.initialise(new List<T2>(results));
  }

  @elanFunction(["initialValue", "lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT2)
  async reduce<T2>(
    @elanGenericParamT2Type() initValue: T2,
    @elanFuncType([ElanT2, ElanT1], ElanT2)
    predicate: (s: T2, value: T1) => Promise<T2>,
  ): Promise<T2> {
    const list = [...this.contents];

    let acc: T2 = initValue;

    for (const i of list) {
      acc = await predicate(acc, i);
    }

    return acc;
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT1)
  async maxBy(
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    const mm = await this.map(predicate);
    const max = Math.max(...mm);
    const i = mm.indexOfItem(max);
    return this.contents[i];
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanT1)
  async minBy(
    @elanFuncType([ElanT1], ElanFloat)
    predicate: (value: T1) => Promise<number>,
  ): Promise<T1> {
    const mm = await this.map(predicate);
    const max = Math.min(...mm);
    const i = mm.indexOfItem(max);
    return this.contents[i];
  }

  @elanFunction(["lambdaOrFunctionRef"], FunctionOptions.pureAsync, ElanClass(List))
  async sortBy(
    @elanFuncType([ElanT1, ElanT1], ElanInt)
    predicate: (a: T1, b: T1) => Promise<number>,
  ): Promise<List<T1>> {
    const clone = [...this.contents];
    const results = await quickSort(clone, predicate);
    return this.system!.initialise(new List<T1>(results));
  }

  @elanFunction([], FunctionOptions.pure, ElanT1)
  head(): T1 {
    return this.safeIndex(0);
  }

  async asString() {
    return `{${await this.system?.asString(this.contents)}}`;
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
}
