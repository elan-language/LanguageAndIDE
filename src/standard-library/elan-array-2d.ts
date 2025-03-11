import {
  ClassOptions,
  elanClass,
  elanFunction,
  elanGenericParamT1Type,
  ElanInt,
  elanIntType,
  elanProcedure,
  ElanT1,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";

@elanClass(ClassOptions.array2D, [ElanT1], [], [], [], "Array2D")
export class ElanArray2D<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray2D();
  }

  async _initialise() {
    return this;
  }

  constructor(arr?: T1[][]) {
    this.contents = arr ? [...arr] : [[]];
  }

  private contents: T1[][];

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

  // @elanProcedure(["index", "value"])
  // putAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
  //   this.system!.safeArraySet(this.contents, index, value);
  // }

  @elanProcedure(["column", "row"])
  putAt(
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ) {
    this.system!.safeArraySet(this.contents[col] as T1[], row, value);
  }

  // @elanProcedure(["index", "value"])
  // insertAt(@elanIntType() index: number, @elanGenericParamT1Type() value: T1) {
  //   this.contents.splice(index, 0, value);
  // }

  // @elanProcedure(["index"])
  // removeAt(@elanIntType() index: number) {
  //   this.contents.splice(index, 1);
  // }

  // @elanProcedure(["value"])
  // removeFirst(@elanGenericParamT1Type() value: T1) {
  //   const index = this.system!.elanIndexOf(this.contents, value);
  //   if (index > -1) {
  //     this.contents.splice(index, 1);
  //   }
  // }

  // @elanProcedure(["value"])
  // removeAll(@elanGenericParamT1Type() value: T1) {
  //   let index = this.system!.elanIndexOf(this.contents, value);
  //   while (index > -1) {
  //     this.contents.splice(index, 1);
  //     index = this.system!.elanIndexOf(this.contents, value);
  //   }
  // }

  // @elanProcedure(["value"])
  // append(@elanGenericParamT1Type() value: T1) {
  //   this.contents.push(value);
  // }

  // @elanProcedure(["other"])
  // appendArray(@elanClassType(ElanArrayImpl) listB: ElanArrayImpl<T1>) {
  //   this.contents.push(...listB.contents);
  // }

  // @elanProcedure(["other"])
  // prepend(@elanGenericParamT1Type() value: T1) {
  //   this.contents.unshift(value);
  // }

  // @elanProcedure(["other"])
  // prependArray(@elanClassType(ElanArrayImpl) listB: ElanArrayImpl<T1>) {
  //   this.contents.unshift(...listB.contents);
  // }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  async asString() {
    const contents = await this.system?.asString(this.contents);
    return `[${contents}]`;
  }

  safeIndex(index1: number, index2?: number) {
    if (index2 === undefined) {
      this.system!.throwRangeError(this.contents, index2);
      return;
    }

    const r = this.contents[index1];

    if (r === undefined) {
      this.system!.throwRangeError(this.contents, index1);
      return;
    }

    const r1 = r[index2];

    if (r1 === undefined) {
      this.system!.throwRangeError(this.contents, index1);
      return;
    }

    return r1 as T1;
  }
}
