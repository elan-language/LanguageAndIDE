import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOptions,
  elanClass,
  ElanClassTypeDescriptor,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { ElanArray } from "./elan-array";

@elanClass(ClassOptions.array, [new ElanClassTypeDescriptor(ElanArray)], [], [], [], "Array2D")
export class ElanArray2D<T1> {
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
    };
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

  // @elanProcedure(["other"])
  // appendArray(@elanClassType(ElanArrayImpl) listB: ElanArrayImpl<T1>) {
  //   this.contents.push(...listB.contents);
  // }

  @elanProcedure(["other"])
  prepend(@elanGenericParamT1Type() value: T1) {
    this.contents.unshift(value);
  }

  // @elanProcedure(["other"])
  // prependArray(@elanClassType(ElanArrayImpl) listB: ElanArrayImpl<T1>) {
  //   this.contents.unshift(...listB.contents);
  // }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  async asString() {
    return await this.system?.asString(this.contents);
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
      this.system!.throwRangeError(this, index1);
    }

    if (index2 && index2 < 0) {
      this.system!.throwRangeError(this, index2);
    }

    const r = this.contents.slice(index1, index2);

    if (r === undefined) {
      throw new ElanRuntimeError(`Out of range index`);
    }

    return this.system?.initialise(new ElanArray(r));
  }
}
