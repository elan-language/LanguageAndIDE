import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOptions,
  elanClass,
  ElanClassTypeDescriptor,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOptions.vector, [ElanT1], [], [], [], "List")
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
    };
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  withAppend(@elanGenericParamT1Type() value: T1): List<T1> {
    const newList = [...this.contents];
    newList.push(value);
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  withPrepend(@elanGenericParamT1Type() value: T1): List<T1> {
    return this.withInsertAt(0, value);
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  withPutAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    const newList = [...this.contents];
    newList[index] = value;

    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["index", "value"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  withInsertAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1): List<T1> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (this.contents as any).toSpliced(index, 0, value);
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["index"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  withRemoveAt(@elanIntType() index: number): List<T1> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newList = (this.contents as any).toSpliced(index, 1);
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["value"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
  withRemoveFirst(@elanGenericParamT1Type() value: T1): List<T1> {
    let newList = [...this.contents];
    const index = this.system!.elanIndexOf(newList, value);
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      newList = (newList as any).toSpliced(index, 1);
    }
    return this.system!.initialise(new List(newList));
  }

  @elanFunction(["value"], FunctionOptions.pure, new ElanClassTypeDescriptor(List))
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
