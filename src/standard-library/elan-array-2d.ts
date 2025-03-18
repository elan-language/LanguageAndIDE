import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOption,
  ElanClass,
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

@elanClass(
  ClassOption.array2D,
  [ElanT1],
  ["columns", "rows", "initialValue"],
  [ElanInt, ElanInt, ElanT1],
  [],
  "Array2D",
)
export class ElanArray2D<T1> {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new ElanArray2D();
  }

  async _initialise(x: number, y: number, value: T1) {
    if (!(typeof value === "boolean" || typeof value === "string" || typeof value === "number")) {
      throw new ElanRuntimeError(`Can only initialise Array2D with simple value`);
    }

    const toInit: T1[][] = [];
    toInit.length = x;

    for (let i = 0; i < x; i++) {
      const subArr: T1[] = [];
      subArr.length = y;
      for (let j = 0; j < y; j++) {
        subArr[j] = value;
      }
      toInit[i] = subArr;
    }

    this.contents = toInit;
    return this;
  }

  constructor(arr?: T1[][]) {
    this.contents = arr ? [...arr] : [];
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

  @elanProcedure(["column", "row", "value"])
  put(@elanIntType() col: number, @elanIntType() row: number, @elanGenericParamT1Type() value: T1) {
    this.system!.safe2DArraySet(this.contents, col, row, value);
  }

  @elanFunction(["column", "row", "value"], FunctionOptions.pure, ElanClass(ElanArray2D))
  withPut(
    @elanIntType() col: number,
    @elanIntType() row: number,
    @elanGenericParamT1Type() value: T1,
  ): ElanArray2D<T1> {
    const newList = [...this.contents];
    this.system!.safe2DArraySet(newList, col, row, value);

    return this.system!.initialise(new ElanArray2D(newList));
  }

  @elanFunction([], FunctionOptions.pure, ElanInt)
  length() {
    return this.contents.length;
  }

  @elanFunction(["item"], FunctionOptions.pure, ElanInt)
  indexOf(
    @elanGenericParamT1Type()
    item: T1,
  ): [number, number] {
    return this.system!.elan2DIndexOf(this.contents, item);
  }

  @elanFunction(["item"], FunctionOptions.pure)
  contains(@elanGenericParamT1Type() item: T1): boolean {
    const [i, _] = this.system!.elan2DIndexOf(this.contents, item);
    return i !== -1;
  }

  async asString() {
    const strContents = [];

    for (const c of this.contents) {
      strContents.push(await this.system?.asString(c));
    }

    return `[${strContents.map((s) => `[${s}]`).join(", ")}]`;
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
